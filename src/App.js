import './App.css';
import {BrowserRouter as Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import User from './pages/User';
import GoToTop from './components/GoToTop';
import About from './pages/About';

function App() {
  return (
   <Router>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/createPost' element={<CreatePost/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<User/>}/>
    </Routes>
    <GoToTop/>
    <Footer/>
   </Router>
  );
}

export default App;