import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const LogoutUser = () => {

        axios.post('http://127.0.0.1:3000/auth/logout/', {refresh_token: localStorage.getItem('Refresh')})
        .then(response => {
            localStorage.clear()
            navigate('/')
        })
        .catch(error => console.log(error))
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Code Camp Tamil</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <NavLink className='nav-link' to={'/home/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to={'/users/'} >UserList</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to={'/create/user/'} >Create-User</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' onClick={LogoutUser}>Logout</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar