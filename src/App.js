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
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <ul>
                        {
                            (user.loggedIn) ?
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                            :
                            <li>
                                <button onClick={login}>Login</button>
                            </li>
                        }
                    </ul>
                </nav>

                <h2>Current User: {user.username}</h2>

                <Routes>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="blog">
                        {/* URL Prefix of /blog */}
                        <Route path=":id" element={<BlogSingle />} />
                        <Route path="" element={<Blog />} />
                    </Route>
                    <Route path="/" element={<Home />}  />
                </Routes>
            </Router>
        </>
    )
}