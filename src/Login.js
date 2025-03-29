

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        const loginBackendEndpoint = "http://127.0.0.1:5000/validate_login";

        fetch(loginBackendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': username, 'password': password}),
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                setAuthenticated(true);
                setMessage(response.message);
            } else {
                setAuthenticated(false);
                setMessage(response.message);
            }
        })
        .catch(error => setMessage("Authentication has failed due to an incorrect password or username"));
    }

    if (authenticated) {
        navigate('/predict');
    }


    return (
        <div>
        <div className='outerContainer'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <br />
                <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />
               
                <label htmlFor="password">Password:</label>
                <br />
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className="buttonStyle" type="submit" style={{width: '100%'}}>Login</button>
            </form>
        </div>
        {!(authenticated) && (
                <div style={{color:'red', textAlign:'center', height:'auto'}}>
                    {message && <div>{message}</div>}
                </div>
            )}
        </div>
    );
}

export default Login


