import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/context';
import MyButton from '../button/MyButton';

const Navbar = () => {

    const { setIsAuth } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem('auth');
        setIsAuth(false)
    }

    return (
        <div className="navbar">
            <MyButton onClick={() => logout()}>Выйти</MyButton>
            <div className="navbar__items" >
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    )
}

export default Navbar
