import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./Order.css";
import axios from "axios";
import {Button} from "@material-ui/core";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Order() {
    const [order, setOrder] = useState([]);
    let [reload, setReload] = useState(1)

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/oder/show'
        })
            .then(response => {
                    setOrder(response.data);
                    console.log(response.data);
                }
            )
            .catch((e) => {
                console.log(e + " error");
            })
    }, [reload]);

    const addOder = async (order) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "code": order.code,
                "cost": order.cost,
                "total_product": order.total_product,
                "customerId": order.customer.id
            });
            const requestOptions = {
                method: 'Put',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = 'http://localhost:8080/api/oder/update';
            await fetch(url, requestOptions);
        } catch (e) {
            console.log("error " + e);
        }
        setReload(reload+1);
    }

    const deleteOrder = async (code) => {
        try {
            const requestOptions = {
                method: 'delete',
                redirect: 'follow'
            };
            const url = `http://localhost:8080/api/oder/delete/code=${code}`;
            await fetch(url, requestOptions);
        } catch (e) {
            console.log("error " + e);
        }
        setReload(reload+1);
    }

    return (
        <div className="order">
            <h2>Quản lý đơn hàng</h2>
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Tên khách hàng</StyledTableCell>
                            <StyledTableCell align="left">Mã đơn hàng</StyledTableCell>
                            <StyledTableCell align="left">Ngày tạo đợn</StyledTableCell>
                            <StyledTableCell align="left">Giá tiền</StyledTableCell>
                            <StyledTableCell align="left">Tổng sản phẩm</StyledTableCell>
                            <StyledTableCell align="left">Thanh toán</StyledTableCell>
                            <StyledTableCell align="left">Thao tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((row) => (
                            <StyledTableRow key={row.code}>
                                <StyledTableCell component="th" scope="row">
                                    {row.customer?.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.code}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.creatDate}</StyledTableCell>
                                <StyledTableCell align="left">{row.cost}$</StyledTableCell>
                                <StyledTableCell align="left">{row.total_product}</StyledTableCell>
                                {row.isPayed ? <StyledTableCell align="left">Đã thanh toán</StyledTableCell> :
                                    <StyledTableCell align="left">Chưa thanh toán</StyledTableCell>}
                                <StyledTableCell align="left">
                                    <Button type="button" variant="contained" onClick={() => addOder(row)}>
                                        Done
                                    </Button>
                                    <Button type="button" variant="contained" onClick={() => deleteOrder(row.code)}>
                                        Cancel
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
