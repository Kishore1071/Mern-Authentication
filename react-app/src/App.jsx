import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Home from './components/menus/Home'
import Navbar from './components/menus/Navbar'

const App = () => {

    const [valid_user, setValidUser] = useState(true)

    let user_validation = localStorage.getItem('ValidUser') === true || valid_user === true

    console.log(user_validation)

    return (
        <div>

            {user_validation && <Navbar />}

            <Routes>

                <Route path='/' element={<Login setValidUser={setValidUser}/>}/>
                <Route path='/home/' element={<Home setValidUser={setValidUser}/>} />

            </Routes>
            
        </div>
    )
}

export default App