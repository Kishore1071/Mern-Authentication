import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [error_message, setErrorMessage] = useState(null)

    const CreateUser = () => {

        const user_data = {
            username,
            password,
            admin: role === '0' ? true: false,
            manager: role === '1' ? true: false,
            team_leader: role === '2' ? true: false,
            employee: role === '3' ? true: false,
        }
        axios.post('http://127.0.0.1:3000/auth/create/', user_data)
        .then(response => {
            if (response.data.status === false) setErrorMessage(<p className='text-danger'>{response.data.message}</p>)
            else navigate('/home/')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='container'>

            <h1 className='fs-3 text-center'>Create User</h1>

            <form className='login-form'>

                <label htmlFor="">Username:</label>
                <input type="text" className='form-control' value={username} onChange={event => setUsername(event.target.value)} />

                <label htmlFor="">Password:</label>
                <input type="password" className='form-control' value={password} onChange={event => setPassword(event.target.value)} />

                <label htmlFor="">Role</label>
                <select className="form-select" value={role} onChange={event => setRole(event.target.value)}>
                    <option value="">Select Role</option>
                    <option value="0">Admin</option>
                    <option value="1">Manager</option>
                    <option value="2">Team Leader</option>
                    <option value="3">Employee</option>
                </select>

                {error_message}

                <input type="button" value="Submit" className='btn btn-primary form-control my-3' onClick={CreateUser}/>

            </form>
        </div>
    )
}

export default Signup