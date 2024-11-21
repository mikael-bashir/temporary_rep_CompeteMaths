import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalState, tokenValid } from '../hooks/GlobalStateContext.js';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        const endpoint = '/register';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Registration successful! Please log in.');
            setUsername('');
            setPassword('');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="loginContainer">
            <form id="loginForm" onSubmit={handleRegister}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
