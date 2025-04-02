import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home and Child/Home';
import Signup from './Loginform/Signup';
import Login from './Loginform/Login';
import Masterhome from './Home and Child/Masterhome';
import NavigationBar from './Home and Child/NavigationBar';
import Profile from './Home and Child/Profile';
import Food from './Food Details/Food';
import About from './Home and Child/About';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>

      <Route path='/' element={<Login />}></Route>
      <Route path='/Signup' element={<Signup />}></Route>

      <Route path='/home' element={<><NavigationBar/><Home/></>}></Route>
      <Route path='/profile' element={<><NavigationBar/><Profile/></>}></Route>
      <Route path='/about' element={<><NavigationBar/><About/></>}></Route>

      <Route path='/food' element={<><NavigationBar/><Food/></>}></Route>
      
     </Routes>
     

     </BrowserRouter>

    </div>
  );
}

export default App;
