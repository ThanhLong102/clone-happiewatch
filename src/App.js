import './App.css';
import Header from "./Header";
import Home from "./Page/Home/Home";
import Footer from "./Footder";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Collection from "./Page/Collection/Collection";
import Item from "./Page/Item/Item";
import Cart from "./Page/Cart/Cart";
import {useEffect, useState} from "react";
import Search from "./Page/Search/Search";
import YourCart from "./Page/Cart/YourCart";
import Upload from "./Page/Upload/Upload";
import Login from "./Page/Login/Login";
import Blog from "./Page/Blog/Blog";
import Payment from "./Page/Payment/Payment";


function App() {
    const [cart,setCart] =useState([]);
    const [user,setUser] = useState({});

    useEffect(() => {
        const data=window.localStorage.getItem("cart")
        setCart(JSON.parse(data))
    }, [])

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart))
    })

    let mark=-1;

    const addCart =(item)=>{
        let tempCart = cart.filter((itemsInCart,index) => {
            if(itemsInCart.id===item.id && itemsInCart.price===item.price){
                mark=index;
            }
            return itemsInCart;
        });

        if(mark >=0){
            tempCart[mark]={...tempCart[mark],quantity:tempCart[mark].quantity+item.quantity};
            mark=-1;
        }
        else {
            tempCart = [...tempCart,item];
        }

        setCart(tempCart);
        console.log(tempCart);
    }

    const removeCart = (item) => {
        let tempCart = cart.filter((itemsInCart) => {
            return itemsInCart!==item;
        });
        setCart(tempCart);
        console.log(tempCart);
    }

   const reduceQuantity = (id) => {
       let tempCart = cart.filter((itemsInCart,index) => {
           if(itemsInCart.id === id){
               mark=index;
           }
           return itemsInCart;
       });
       if(tempCart[mark].quantity>1){
           tempCart[mark]={...tempCart[mark],quantity:tempCart[mark].quantity-1};
       }
       mark=-1;
       setCart(tempCart);
   }

    const raiseQuantity = (id) => {
        let tempCart = cart.filter((itemsInCart,index) => {
            if(itemsInCart.id === id){
                mark=index;
            }
            return itemsInCart;
        });
        tempCart[mark]={...tempCart[mark],quantity:tempCart[mark].quantity+1};
        mark=-1;
        setCart(tempCart);
    }

    const getTotalQuantity = () => {
        let t=0;
        cart.forEach(e => t=t+e.quantity);
        return t
    }
    const totalQuantity=getTotalQuantity();

    const [displayCart,setDisplayCart] = useState(false);
    const [displayLogin,setDisplayLogin] = useState(true);

    const handleDisplayCart = () => setDisplayCart(!displayCart);
    const handleDisplay = () => {
        if(displayCart){
            setDisplayCart(false);
        }
        if(displaySearch){
            setDisplaySearch(false);
        }
        if(displayLogin){
            setDisplayLogin(false);
        }
    }

    const [displaySearch,setDisplaySearch] = useState(false);

    const handleDisplaySearch = () => setDisplaySearch(!displaySearch);
    const handleDisplayLogin = () => setDisplayLogin(!displayLogin);

    const changeQuantity = (yourChangeQuantity) => {
        console.log(yourChangeQuantity)
        let tempCart = cart.filter((itemsInCart,index) => {
            if(itemsInCart.id === yourChangeQuantity.id){
                mark=index;
            }
            return itemsInCart;
        });
        tempCart[mark]={...tempCart[mark],quantity:yourChangeQuantity.quantityChange};
        mark=-1;
        setCart(tempCart);
    }
    const [login,setLogin]=useState(false);

    function getLogin(e) {
       if(e){
           setLogin(e)
           setDisplayLogin(!displayLogin);
       }
    }


    function handleDisplayLogout() {
        setLogin(false);
        setUser({});
    }

    function handleUser(data){
        console.log(data);
        setUser(data);
    }
  return (
    <div className="App">
        <BrowserRouter >
            <div className="app-container" >
                <Header handleDisplay={handleDisplay}
                        handleDisplayCart={handleDisplayCart}
                        handleDisplaySearch={handleDisplaySearch}
                        handleDisplayLogin={handleDisplayLogin}
                        handleDisplayLogout={handleDisplayLogout}
                        totalItems={totalQuantity}
                        login={login}
                />
                {
                    displayLogin &&  <Login handleDisplayLogin={handleDisplayLogin}
                                            logged={getLogin}
                                            usered={handleUser}
                    />
                }
                {
                    displayCart && <Cart cart={cart}
                                         removeCart={removeCart}
                                         reduceQuantity={reduceQuantity}
                                         raiseQuantity={raiseQuantity}
                                         totalQuantity={totalQuantity}
                    />
                }
                {
                    displaySearch && <Search
                    />
                }
                <Switch>
                    <Route
                        path="/"
                        exact
                    >
                        <Home/>
                    </Route>
                    <Route
                        path="/collection"
                        exact
                    >
                        <Collection
                            Type="collection"
                        />
                    </Route>
                    <Route
                        path="/strap"
                        exact
                    >
                        <Collection
                            Type="strap"
                        />
                    </Route>
                    <Route
                        path="/blog"
                        exact
                    >
                        <Blog/>
                    </Route>
                    <Route
                        path="/upload"
                        exact
                    >
                        <Upload/>
                    </Route>
                    <Route
                        path="/collection/:id"
                        exact
                    >
                        <Item addCart={addCart} />
                    </Route>
                    <Route
                        path="/cart"
                        exact
                    >
                        <YourCart cart={cart}
                                  changeQuantity={changeQuantity}
                        />
                    </Route>
                    <Route
                        path="/payment"
                        exact
                    >
                        <Payment items={cart}
                                user={user}
                        />
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
