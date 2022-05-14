import React from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css'
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";


function Header({handleDisplayCart,totalItems,handleDisplaySearch,handleDisplayMenu,handleDisplay,handleDisplayLogin,login,handleDisplayLogout}) {
    return (
        <div className="header" onClick={handleDisplay}>
            <Link to='/' >
                <img className="header_logo" src="https://cdn.shopify.com/s/files/1/0477/6699/5109/files/logo_de4a0ab6-f5e0-4a0f-9c68-c20f8a803fc7.png?v=1627962695" alt="Logo"/>
            </Link>
            <div className="header_page">
                <Link to='/collection' style={{textDecoration: 'none' }}>
                    <p className="page">FEATURED COLLECTION</p>
                </Link>
                <Link to='/strap' style={{textDecoration: 'none' }}>
                    <p className="page">STRAPS</p>
                </Link>
                <Link to='/blog' style={{textDecoration: 'none' }}>
                    <p className="page">BLOGS</p>
                </Link>
            </div>
            <div className="header_items">
                { login === false  ? <h6 className="header_items_login"  onClick={handleDisplayLogin}>LOGIN</h6> : <div className="logout">
                    <h6 className="header_items_login" onClick={handleDisplayLogout} >LOG OUT</h6>
                    <AccountCircleIcon fontSize="small" style={{marginRight:"20px",marginTop:"32px"}}/>
                </div> }
                <p>CART</p>
                {totalItems>0 && <span>{totalItems}</span>}
                <ShoppingCartOutlinedIcon className="header_item" onClick={handleDisplayCart} fontSize="small" style={{cursor:"pointer"}}/>
                <p>|</p>
                <SearchIcon className="header_item" onClick={handleDisplaySearch}  fontSize="small" style={{cursor:"pointer"}}/>
                <MenuIcon className="header_item"  fontSize="small" onClick={handleDisplayMenu}/>
            </div>
        </div>
    );
}

export default Header;