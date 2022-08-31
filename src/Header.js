import React from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css'
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Header({handleDisplayCart,totalItems,handleDisplaySearch,handleDisplayMenu,handleDisplay,handleDisplayLogin,login,handleDisplayLogout}) {
    return (
        <div className="header" onClick={handleDisplay}>
            <Link to='/' style={{textDecoration: 'none', marginLeft: '20px', color: 'black'}}>
                <h2>HIWWATCH</h2>
            </Link>
            <div className="header_page">
                <Link to='/collection' style={{textDecoration: 'none' }}>
                    <p className="page">Bộ sưu tập</p>
                </Link>
                <Link to='/strap' style={{textDecoration: 'none' }}>
                    <p className="page">Dây đeo</p>
                </Link>
                <Link to='/blog' style={{textDecoration: 'none' }}>
                    <p className="page">Bài viết</p>
                </Link>
            </div>
            <div className="header_items">
                { login === false  ? <h6 className="header_items_login"  onClick={handleDisplayLogin}>Đăng nhập</h6> : <div className="logout">
                    <h6 className="header_items_login" onClick={handleDisplayLogout} >Đăng xuất</h6>
                    <AccountCircleIcon fontSize="small" style={{marginRight:"20px",marginTop:"32px"}}/>
                </div> }
                <p>Giỏ hàng</p>
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
