import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

export default function Admin() {

    return (
        <div className="search" style={{height:'0', marginLeft:'91%'}}>
            <div>
                <Link to='/admin/item' style={{textDecoration: 'none' }}>
                    <Button type="button" variant="outlined"  color="secondary">
                        Quản lý sản phẩm
                    </Button>
                </Link>
            </div>
            <div>
                <Link to='/admin/order' style={{textDecoration: 'none'}}>
                    <Button type="button" variant="outlined" color="secondary">
                        Quản lý đơn hàng
                    </Button>
                </Link>
            </div>
            <div>
                <Link to='/admin/account' style={{textDecoration: 'none'}}>
                    <Button type="button" variant="outlined" color="secondary">
                        Quản lý khách hàng
                    </Button>
                </Link>
                <Link to='/admin/statistical' style={{textDecoration: 'none'}}>
                    <Button type="button" variant="outlined" color="secondary">
                        Thống kê
                    </Button>
                </Link>
            </div>
        </div>

    );
}
