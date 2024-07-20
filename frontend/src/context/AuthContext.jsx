import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [load,setLoad] =useState(true);
    
    useEffect(() => {
        // const userInfo = localStorage.getItem('userInfo');
        // if (userInfo) {
        //     setUser(JSON.parse(userInfo));
        // }
        const checkAuth = async () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                const token = parsedUserInfo.token;
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/verify`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    //console.log("resp : ",response)
                    setUser(parsedUserInfo);
                } catch (error) {
                    console.error('Token verification failed', error);
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
            setLoad(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            throw new Error('Login failed. Please check your credentials.');
        }finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { username, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            console.log("data :",data)
            setUser(data);
            return true;
        } catch (error) {
            console.error('Registration failed', error);
            throw new Error(error.response.data.message,'Registration failed. Please try again.');
        }finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!load && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
