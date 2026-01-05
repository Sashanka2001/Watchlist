import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Search from "./pages/Search"
import MyList from "./pages/MyList"
import Details from "./pages/Details"
import Watched from "./pages/Watched"
import Watching from "./pages/Watching"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import './App.css'

export default function App(){
  return (
    <BrowserRouter>
      <div style={{padding:12,borderBottom:'1px solid #eee'}}>
        <Link to="/home">Home</Link> | <Link to="/search">Search</Link> | <Link to="/my-list">My List</Link> | <Link to="/watching">Watching</Link> | <Link to="/watched">Watched</Link> | <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
      </div>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/home" element={<div style={{padding:20}}><h2>Welcome to MyWatchlist</h2><p>Use Search to find movies.</p></div>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/my-list" element={<MyList/>} />
        <Route path="/watching" element={<Watching/>} />
        <Route path="/watched" element={<Watched/>} />
        <Route path="/movie/:id" element={<Details/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}
