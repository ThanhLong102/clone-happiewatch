import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {Link} from "react-router-dom";
import ItemSearch from "./ItemSearch";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        paddingTop:10,
        border:"#f8f9fa",
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        color:"black"
    },
}));

export default function Autocompletes() {

    const [itemSearch,setItemSearch]= useState([]);
    const [keySearch,setKeySearch] = useState("");


    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/watch/show'
        })
            .then(response => {
                console.log(response);
                const item = response.data.filter((items)=> items.name.toUpperCase().includes(keySearch.toUpperCase()));
                console.log(item)
                setItemSearch(item);
            })
            .catch((err) => {
                console.log("error:"+err);
            })
    }, [keySearch]);
    const classes = useStyles();

    const loop=[{title:keySearch,items:itemSearch},
    ];
    const top = [
        {title:"LuxuryWatches"},
        {title:"Watch"},
        {title:"LuxuryWatches"},
        {title:"Chorono"},
        {title:"Gold Straps"},
        {title:"Space Trap"},
        {title:"Bracelets"}
    ];
    return (
        <div className={classes.root}>
            <Autocomplete
                size="small"
                options={loop}
                getOptionLabel={(option) => option.title}
                defaultValue={""}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" label="Search" placeholder="Search..." onChange={event => setKeySearch(event.target.value)}/>
                }
                renderOption={(option) =>
                    <div>
                        { keySearch === "" && top.map((i) => <h5>{i.title}</h5>)}
                        <div className="products">
                            {
                                option.items.map((product) =>
                                    <Link to={ `collection/${ product.id }`} style={{textDecoration: 'none' }}>
                                        <ItemSearch key={product.id}
                                                    image={product.detail[0].image}
                                                    name={product.name}
                                                    price={product.detail[0].price}
                                        />
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                }
            />
        </div>
    );
}
