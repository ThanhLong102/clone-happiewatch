import React from 'react';
import './Search.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Autocompletes from "./Autocomplete";


function Search() {

    return (
        <div className="search">
            <div className="search_byTitle">
                <SearchOutlinedIcon/>
                <Autocompletes/>
            </div>
        </div>
    );
}

export default Search;