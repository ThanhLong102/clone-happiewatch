import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import EqualizerIcon from '@mui/icons-material/Equalizer';


export default function Admin() {

    return (
        <div className="search" style={{height: '0', marginLeft: '85%', background: "gray"}}>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Menu quản lý
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <Link to='/admin/item' style={{textDecoration: 'none', display: 'flex'}}>
                        <ListItemIcon>
                            <CategoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý sản phẩm"/>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <Link to='/admin/order' style={{textDecoration: 'none', display: 'flex'}}>
                        <ListItemIcon>
                            <Inventory2Icon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý đơn hàng"/>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <Link to='/admin/account' style={{textDecoration: 'none', display: 'flex'}}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Quản lý khách hàng"/>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <Link to='/admin/statistical' style={{textDecoration: 'none', display: 'flex'}}>
                        <ListItemIcon>
                            <EqualizerIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Thống kê"/>
                    </Link>
                </ListItemButton>
            </List>
        </div>

    );
}
