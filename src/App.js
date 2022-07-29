import { useState, useContext } from 'react'
import PostList from './components/PostList'
import { BrowserRouter as Router,
    Routes,
    Route,
    Link 
} from 'react-router-dom'
import Contact from './views/Contact'
import Home from './views/Home'
import Blog from './views/Blog'
import BlogSingle from './views/BlogSingle'
import firebase from './firebase'
import { AuthContext } from './contexts/AuthProvider'


export default function App() {
    const { login, logout, user } = useContext(AuthContext)

    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation"></button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/blog" className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {
                                (user.loggedIn) ?
                                <li className="nav-item">
                                    <button onClick={logout}>Logout</button>
                                </li>
                                :
                                <li className="nav-item">
                                    <button onClick={login}>Login</button>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>

                <main className="container mt-4">
                    <h2>Current User: {user.username}</h2>

                    <Routes>
                        <Route path="/contact" element={<Contact />} />
                        <Route path="blog">
                            {/* URL Prefix of /blog */}
                            <Route path=":uid">
                                {/* URL Prefix of /blog/USER_ID/POST_ID */}
                                <Route path=":id" element={<BlogSingle />} />
                            </Route>
                            <Route path="" element={<Blog />} />
                        </Route>
                        <Route path="/" element={<Home />}  />
                    </Routes>
                </main>
            </Router>
        </>
    )
}