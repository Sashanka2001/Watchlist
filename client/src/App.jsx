import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Search from "./pages/Search"
import MyList from "./pages/MyList"
import Details from "./pages/Details"
import Watched from "./pages/Watched"
import Watching from "./pages/Watching"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import RequireAuth from "./components/RequireAuth"
import './App.css'
import { useLocation } from "react-router-dom"

export default function App(){
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent(){
  const location = useLocation();
  const hideNav = location.pathname === '/' || location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <>
      {!hideNav && (
        <div style={{padding:12,borderBottom:'1px solid #eee'}}>
          <Link to="/home">Home</Link> | <Link to="/search">Search</Link> | <Link to="/my-list">My List</Link> | <Link to="/watching">Watching</Link> | <Link to="/watched">Watched</Link> | <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/home" element={<RequireAuth><div style={{padding:20}}><h2>Welcome to MyWatchlist</h2><p>Use Search to find movies.</p></div></RequireAuth>} />
        <Route path="/search" element={<RequireAuth><Search/></RequireAuth>} />
        <Route path="/my-list" element={<RequireAuth><MyList/></RequireAuth>} />
        <Route path="/watching" element={<RequireAuth><Watching/></RequireAuth>} />
        <Route path="/watched" element={<RequireAuth><Watched/></RequireAuth>} />
        <Route path="/movie/:id" element={<RequireAuth><Details/></RequireAuth>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </>
  )
}
