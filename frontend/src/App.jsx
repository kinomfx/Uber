import React from 'react'
import { Route , Routes} from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import Home from './pages/Home.jsx'
import Logout from './pages/Logout.jsx'
import UserProtectiWrapper from './pages/UserProtectiWrapper.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
const App = () => {
  return (
    <div className=' flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
        <Route path='/captain-login' element={<CaptainLogin/>}></Route>
        <Route path='/captain-signup' element={<CaptainSignUp/>}></Route>
        <Route path='/login' element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignUp/>}></Route>
        <Route path='/home' element={
          <UserProtectiWrapper>
            <Home/>
          </UserProtectiWrapper>
        }></Route>
        <Route path='/logout' element={
          <UserProtectiWrapper>
            <Logout/>
          </UserProtectiWrapper>
        }></Route>
        <Route path='/captain-home' element={
          <UserProtectiWrapper>
            <CaptainHome/>
          </UserProtectiWrapper>
        }></Route>
        <Route path='/captain-logout' element={<CaptainLogout/>}></Route>
        <Route path='/riding' element={<Riding/>}></Route>
        <Route path='/captain-riding' element={<CaptainRiding/>}></Route>
      </Routes>
    </div>
  )
}

export default App
