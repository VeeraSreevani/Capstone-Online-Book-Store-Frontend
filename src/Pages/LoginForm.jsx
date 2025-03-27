import axios from 'axios';
import React, { useState } from 'react'

function LoginForm() {
    const [login, setLogin] = useState({
        email: '',
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/user', login);
            alert('Login successfully!')
            window.location.href = '/'
        } catch (err) {
            console.error('Error Login: ', err);
            alert('Invalid credentials. Please try again.')
        }
    }
    return (
        <div className='p-6 max-w-md mx-auto'>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign-Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <div>
                    <label htmlFor="username" className="block text-gray-700">
                        Username:
                    </label>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        value={login.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                    <label htmlFor="email" className="block text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={login.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
               
                <div>
                    <label htmlFor="password" className="block text-gray-700">
                        Password:
                    </label>
                    <input type="password"
                    id='password'
                    name='password'
                    value={login.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    />
                </div>
                <button
                type='submit'
                className="px-6 py-3 bg-rose-400 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
                >
                    Sign-Up
                </button>
            </form>
        </div>
    )
}
export default LoginForm