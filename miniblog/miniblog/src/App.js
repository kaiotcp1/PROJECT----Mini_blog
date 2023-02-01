import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import DashBoard from './pages/Dashboard/Dashboard';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }
  
  
  return (
    <div className="App">
      <AuthProvider value={{user}}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            {/* testes de fechamento... */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/"></Navigate>} ></Route>
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/"></Navigate>}></Route>
            <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login"></Navigate>}></Route>
            <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/login"></Navigate>}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
