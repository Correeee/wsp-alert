import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import Login from './components/login/login';
import './styles.css'
import Register from './components/register/register';
import { Toaster } from 'react-hot-toast';
import AuthProvider, { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Tasks from './components/tasks/tasks';
import Footer from './footer/footer';


function App() {

  return (
    <div className="App">
      <AuthProvider >
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Register' element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster toastOptions={{
          style: {
            fontSize: '1.5rem',
            textAlign: 'center'
          }
        }} />
      </AuthProvider>
    </div>
  );
}

export default App;
