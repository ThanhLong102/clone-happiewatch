import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";


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

export default function Account() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/customer/show'
        })
            .then(response => {
                setData(response.data);
                    console.log(response.data);
                }
            )
            .catch((e) => {
                console.log(e + " error");
            })
    }, []);


    return (
        <div className="order">
            <h2>Customer Information Management</h2>
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Address</StyledTableCell>
                            <StyledTableCell align="left">Telephone</StyledTableCell>
                            <StyledTableCell align="left">UserName</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.code}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.address}</StyledTableCell>
                                <StyledTableCell align="left">{row.telephone}</StyledTableCell>
                                <StyledTableCell align="left">{row.username}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
