import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { username, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
