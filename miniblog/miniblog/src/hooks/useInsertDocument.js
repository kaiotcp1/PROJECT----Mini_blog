import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from '../firebase/config'

const initialState = {
    loading: null,
    error: null
};

const insertReducer = (state, action) => {

    checkCancelBeforeDispatch({
        type: "LOADING",
        payload: insertDocument
    })

    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state;

    }

}

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const insertDocument = async (document) => {
        try {
            const newDocument = { ...document, createdAT: Timestamp.now() };
            const insertDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        insertDocument,
        response
    }
};