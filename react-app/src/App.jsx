import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Home from './components/menus/Home'
import Navbar from './components/menus/Navbar'
import Signup from './components/authentication/Signup'
import UserList from './components/authentication/UserList'

const App = () => {

    const [valid_user, setValidUser] = useState(false)

    let user_validation = localStorage.getItem('Bearer') !== null || valid_user === true

    console.log(user_validation)

    return (
        <div>

            {user_validation && <Navbar />}

            <Routes>

                <Route path='/' element={<Login setValidUser={setValidUser}/>}/>
                <Route path='/home/' element={<Home setValidUser={setValidUser}/>} />
                <Route path='/create/user/' element={<Signup />} />
                <Route path='/users/' element={<UserList />} />

            </Routes>
            
        </div>
    )
}

export default App