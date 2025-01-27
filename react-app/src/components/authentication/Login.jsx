import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setValidUser}) => {

    setValidUser(false)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error_message, setErrorMessage] = useState(null)

    const LoginUser = () => {

        const user_data = {
            username,
            password
        }

        axios.post('http://127.0.0.1:3000/auth/login/', user_data)
        .then(response => {
            
            if (response.data.status === false) {
                setErrorMessage(<p className='text-danger fs-5'>{response.data.message + " Try Again!"}</p>)
            }
            else {

                console.log(response.data)

                const Role = user => {
                    if (user.admin) return 'Admin'
                    else if (user.manager) return 'Manager'
                    else if (user.team_leader) return 'Team Leader'
                    else if (user.employee) return 'Employee'
                }

                console.log(Role(response.data.user_data))

                localStorage.setItem('role', Role(response.data.user_data))
                localStorage.setItem('Bearer', response.data.access_token)
                localStorage.setItem('Refresh', response.data.refresh_token)
                localStorage.setItem('ValidUser', true)
                navigate('/home/')
            }
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {

        const fetchData = async () => {

            const token = {
                refresh_token: localStorage.getItem('Refresh')
            }

            axios.post('http://127.0.0.1:3000/auth/token/', token)
            .then(response => {
                console.log("Auto Logging")
                localStorage.setItem("Bearer", response.data.access_token)
            })
            .catch(error => console.log(error))
        }
        
        fetchData()
        
        setInterval(fetchData, 30000)

        if (localStorage.getItem('Bearer') !== null) {
            setValidUser(false)
            navigate('/home/')
        }
    }, [])

    return (
        <div className='container'>

            <h1 className='fs-3 text-center'>Login to continue...</h1>

            <form className='login-form'>

                <label htmlFor="">Username:</label>
                <input type="text" className='form-control' value={username} onChange={event => setUsername(event.target.value)} />

                <label htmlFor="">Password:</label>
                <input type="password" className='form-control' value={password} onChange={event => setPassword(event.target.value)} />

                {error_message}

                <input type="button" value="Submit" className='btn btn-primary form-control my-3' onClick={LoginUser} />

            </form>
        </div>   
    )

}

export default Login