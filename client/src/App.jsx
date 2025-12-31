import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Search from "./pages/Search"
import MyList from "./pages/MyList"
import Details from "./pages/Details"
import './App.css'

export default function App(){
  return (
    <BrowserRouter>
      <div style={{padding:12,borderBottom:'1px solid #eee'}}>
        <Link to="/">Home</Link> | <Link to="/search">Search</Link> | <Link to="/my-list">My List</Link>
      </div>
      <Routes>
        <Route path="/" element={<div style={{padding:20}}><h2>Welcome to MyWatchlist</h2><p>Use Search to find movies.</p></div>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/my-list" element={<MyList/>} />
        <Route path="/movie/:id" element={<Details/>} />
      </Routes>
    </BrowserRouter>
  )
}
