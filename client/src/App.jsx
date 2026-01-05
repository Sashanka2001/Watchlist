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
        <Route path="/home" element={
          <div style={{display:'flex', minHeight:'75vh'}}>
            <aside style={{width:220, padding:20, borderRight:'1px solid rgba(255,255,255,0.04)'}}>
              <nav>
                <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12}}>
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/search">Search</Link></li>
                  <li><Link to="/my-list">My List</Link></li>
                  <li><Link to="/watching">Watching</Link></li>
                  <li><Link to="/watched">Watched</Link></li>
                </ul>
              </nav>
            </aside>
            <main style={{flex:1, padding:40, textAlign:'center'}}>
              <div style={{marginBottom:18}}>
                <Link to="/home">Home</Link> | <Link to="/search">Search</Link> | <Link to="/my-list">My List</Link> | <Link to="/watching">Watching</Link> | <Link to="/watched">Watched</Link> | <Link to="/sign-in">Sign In</Link> | <Link to="/sign-up">Sign Up</Link>
              </div>
              <div style={{maxWidth:700, margin:'40px auto 0'}}>
                <h2 style={{fontSize:24, marginBottom:8}}>Welcome to MyWatchlist</h2>
                <p style={{color:'#9ca3af'}}>Use Search to find movies.</p>
              </div>
            </main>
          </div>
        } />
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
