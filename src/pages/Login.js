import React, { useState, useEffect } from 'react';
import { useGlobalState, tokenValid } from '../hooks/GlobalStateContext.js';

const LoginForm = () => {
    const { token, setIsTokenValid, setToken } = useGlobalState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Effect to initialize the token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, [setToken]);

    // Effect to validate token whenever it changes
    useEffect(() => {
        if (token && tokenValid(token)) {
            setIsTokenValid(true);
            localStorage.setItem('loggedIn', true);
        } else {
            setIsTokenValid(false);
            localStorage.setItem('loggedIn', false);
        }
    }, [token, setIsTokenValid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.success) {
                const newToken = data.token;
                localStorage.setItem('token', newToken);  // Store JWT for authenticated requests
                localStorage.setItem('loggedIn', 'true');
                setToken(newToken); // Update global state with the new token
                console.log(`token value in localStorage: ${localStorage.getItem('token')}`)
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('There was a problem with the login request:', error);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <div className="loginContainer">
            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
