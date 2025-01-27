import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserList = () => {

    const [users, setUsers] = useState([])

    const user_list = users.map((user, index) => {

        const Role = user => {
            if (user.admin) return 'Admin'
            else if (user.manager) return 'Manager'
            else if (user.team_leader) return 'Team Leader'
            else if (user.employee) return 'Employee'
        }

        return (
            <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{Role(user)}</td>
            </tr>
        )
    })

    useEffect(() => {

        const headers = {
            'Content-Type': 'Application/Json',
            'Authorization': localStorage.getItem('Bearer')
        }

        axios.get('http://127.0.0.1:3000/auth/users/', {headers})
        .then(response => {
            setUsers(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {user_list}
                </tbody>
            </table>
        </div>
    )

}

export default UserList