import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Latest from './components/Latest'
import Login from './components/Login'
import Signup from './components/Signup'
import NewsDetail from './components/NewsDetail'
import PrivateRoute from './components/PrivateRoute'
import NewsList from './components/NewsList'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logout from './components/Logout'
import '../src/styles/variables.css'
import PlaylistVideos from './components/PlaylistVideos'
import PlaylistFirstVideos from './components/PlaylistFirstVideos'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={
            <PrivateRoute>
            <Contact />
            </PrivateRoute>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/:newscategory/:type' element={<NewsList />} />
          <Route path="/:slug" element={<NewsDetail />} />
          <Route path="/playlist/:id" element={<PlaylistVideos/>} />
          <Route path='/playlists' element={<PlaylistFirstVideos/>}/>

          <Route path="/latest" element={
            // <PrivateRoute>
              <Latest />
            // </PrivateRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
