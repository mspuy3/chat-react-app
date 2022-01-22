import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const API_URL = "https://slackapi.avionschool.com/api/v1";

const LandingPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("headers")) {
            navigate(`../main`, { replace: true });
        }
    }, []);

    return (
        <div className='bg-light w-100 vh-100 p-3 d-flex flex-column justify-content-center'>
            <h1 className='text-center text-primary display-1'>🤷‍♂️Just Chat🤷‍♂️</h1>

            <div className="d-flex justify-content-center m-3">
                <LoginForm />
                <RegisterForm />
            </div>
            
            <p className="text-center">ang one week na app</p>

        </div>
    );
};

export default LandingPage;
