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
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";


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

export default function ItemQl() {
    const [item, setItem] = useState([]);
    let [reload, setReload] = useState(1)

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/watch/show'
        })
            .then(response => {
                    setItem(response.data);
                    console.log(response.data);
                }
            )
            .catch((e) => {
                console.log(e + " error");
            })
    }, [reload]);

    const deleteItem = async (id) => {
        try {
            const requestOptions = {
                method: 'delete',
                redirect: 'follow'
            };
            const url = `http://localhost:8080/api/detail/delete/id=${id}`;
            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            console.log({responseJson});
        } catch (e) {
            console.log("error " + e);
        }
        setReload(reload + 1);
    }

    return (
        <div className="order">
            <h2>Product Management</h2>
            <Link to='/admin/upload' style={{textDecoration: 'none'}}>
                <Button type="button" variant="contained">
                    Add new item
                </Button>
            </Link>
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Images</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Material</StyledTableCell>
                        <StyledTableCell align="left">Quantity</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Manipulation</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {item.map((row) => (row.detail.map((i) => (
                                <StyledTableRow key={i.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <img src={i.image} alt='' style={{height: "100px"}}/>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{i.material}</StyledTableCell>
                                    <StyledTableCell align="left">{i.quantity} chiếc</StyledTableCell>
                                    <StyledTableCell align="left">{i.price}$</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Link to={`/admin/item/${i.id}`} style={{textDecoration: 'none'}}>
                                            <Button type="button" variant="contained">
                                                Update
                                            </Button>
                                        </Link>
                                        <Button type="button" variant="contained" onClick={() => deleteItem(i.id)}>
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
