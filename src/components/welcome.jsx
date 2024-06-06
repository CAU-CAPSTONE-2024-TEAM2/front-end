import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Welcome = () =>{
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <button onClick={handleLoginClick} className="login-button">
                Go to Login Page
            </button>
        </div>
    )
}

export default Welcome;