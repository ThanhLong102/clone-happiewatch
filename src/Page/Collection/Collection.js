import React, {useEffect, useState} from 'react';
import './Collection.css'
import Product from "./Product";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from 'axios';

function Collection({Type}) {
    const type=Type
    const [infoProduct,setInfoProduct]= useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/watch/show'
        })
            .then(response => {
                console.log(response);
                let temp;
                if(type==="collection"){
                    temp=response.data.filter((it)=> it.type==="watch")
                }
                else {
                    temp=response.data.filter((it)=> it.type==="strap")
                }
                setInfoProduct(temp);
            })
            .catch((e) => {
                console.log(e+ " error");
            })
    }, [type]);



    const [sortBy,setSortBy]=useState("Featured");

    const products = infoProduct  ;

    const getProductSorted = () => {
        return products.sort((p1,p2) =>{
            if(sortBy === "Featured") return (p1.detail[0].material).localeCompare(p2.detail[0]?.material);
            else if(sortBy === "Price,low to high") return p1.detail[0].price-p2.detail[0].price;
            else if(sortBy === "Price,high to low") return p2.detail[0].price-p1.detail[0].price;
            else if(sortBy === "A-Z") return p1.name.localeCompare(p2.name);
            else return p2.name.localeCompare(p1.name)
        });
    }


    const productSorted=getProductSorted();

    return (
        <div className="Collection">
            {   type === "collection" ?(
                <div>
                    <img src="https://cdn.shopify.com/s/files/1/0477/6699/5109/files/BANNER500.jpg?v=1629452134" alt=""/>
                    <h3>Bộ sưu tập nổi bật</h3>
                    <p className="title">HappieWatch hợp tác với các nhà thiết kế tài năng, cũng như các nghệ sĩ graffiti và xăm hình trên toàn thế giới, để mang đến cho bạn toàn bộ bộ sưu tập đồng hồ đeo tay độc nhất vô nhị.
                    </p>
                </div>):
                <div>
                    <h3>Dây đeo</h3>
                </div>
            }
            <div className="filters">
                <FormControl variant="outlined" >
                    <InputLabel htmlFor="outlined-age-native-simple">Sắp xếp</InputLabel>
                    <Select
                        native
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        label="Sort"
                        inputProps={{
                            name: 'sort',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="Featured">Đặc sắc</option>
                        <option value="Price,low to high">Giá từ thấp đến cao</option>
                        <option value="Price,high to low">Giá từ cao đến thấp</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </Select>
                </FormControl>
            </div>
            <div className="products">
                {
                    productSorted.map((product) =>{
                            return(<Link to={ `/collection/${ product.id }`} style={{textDecoration: 'none' }}>
                                <Product key={product.id}
                                         image={product.detail[product.id%4].image}
                                         name={product.name}
                                         price={product.detail[product.id%4].price}
                                />
                            </Link>)
                        }
                    )
                }
            </div>
        </div>
    );
}

export default Collection;
