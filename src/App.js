import './App.css';
import Header from "./Header";
import Home from "./Page/Home/Home";
import Footer from "./Footder";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
import Order from "./Admin/Order/Order";
import Admin from "./Admin/Admin";
import ItemQl from "./Admin/Item/ItemQl";
import UpdateItem from "./Admin/Item/UpdateItem";
import Account from "./Admin/customer/Account";
import Paypal from "./Page/PayPall/Paypal";
import PaySuccess from "./Page/PayPall/PaySuccess";
import {addResponseMessage, Widget} from "react-chat-widget";

function App() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const dataCart = window.localStorage.getItem("cart");
        const dataUser = window.localStorage.getItem("user");
        if (dataUser) {
            setLogin(true);
            setUser(JSON.parse(dataUser));
        }
        setCart(JSON.parse(dataCart));
    }, [])

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart));
        if (user?.name) {
            window.localStorage.setItem("user", JSON.stringify(user));
        }
    })

    let mark = -1;

    const addCart = (item) => {
        let tempCart = cart.filter((itemsInCart, index) => {
            if (itemsInCart.id === item.id && itemsInCart.price === item.price) {
                mark = index;
            }
            return itemsInCart;
        });

        if (mark >= 0) {
            tempCart[mark] = {...tempCart[mark], quantity: tempCart[mark].quantity + item.quantity};
            mark = -1;
        } else {
            tempCart = [...tempCart, item];
        }

        setCart(tempCart);
        console.log(tempCart);
    }

    const removeCart = (item) => {
        let tempCart = cart.filter((itemsInCart) => {
            return itemsInCart !== item;
        });
        setCart(tempCart);
        console.log(tempCart);
    }

    const reduceQuantity = (id) => {
        let tempCart = cart.filter((itemsInCart, index) => {
            if (itemsInCart.id === id) {
                mark = index;
            }
            return itemsInCart;
        });
        if (tempCart[mark].quantity > 1) {
            tempCart[mark] = {...tempCart[mark], quantity: tempCart[mark].quantity - 1};
        }
        mark = -1;
        setCart(tempCart);
    }

    const raiseQuantity = (id) => {
        let tempCart = cart.filter((itemsInCart, index) => {
            if (itemsInCart.id === id) {
                mark = index;
            }
            return itemsInCart;
        });
        tempCart[mark] = {...tempCart[mark], quantity: tempCart[mark].quantity + 1};
        mark = -1;
        setCart(tempCart);
    }

    const getTotalQuantity = () => {
        let t = 0;
        cart.forEach(e => t = t + e.quantity);
        return t
    }
    const totalQuantity = getTotalQuantity();

    const [displayCart, setDisplayCart] = useState(false);
    const [displayLogin, setDisplayLogin] = useState(false);

    const handleDisplayCart = () => setDisplayCart(!displayCart);
    const handleDisplay = () => {
        if (displayCart) {
            setDisplayCart(false);
        }
        if (displaySearch) {
            setDisplaySearch(false);
        }
        if (displayLogin) {
            setDisplayLogin(false);
        }
    }

    const [displaySearch, setDisplaySearch] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    const handleDisplaySearch = () => setDisplaySearch(!displaySearch);
    const handleDisplayLogin = () => setDisplayLogin(!displayLogin);
    const handleDisplayMenu = () => {
        if (user.username === "admin" && user.password === "admin") {
            setDisplayMenu(!displayMenu);
        }
    }

    const changeQuantity = (yourChangeQuantity) => {
        console.log(yourChangeQuantity)
        let tempCart = cart.filter((itemsInCart, index) => {
            if (itemsInCart.id === yourChangeQuantity.id) {
                mark = index;
            }
            return itemsInCart;
        });
        tempCart[mark] = {...tempCart[mark], quantity: yourChangeQuantity.quantityChange};
        mark = -1;
        setCart(tempCart);
    }
    const [login, setLogin] = useState(false);

    function getLogin(e) {
        if (e) {
            setLogin(e)
            setDisplayLogin(!displayLogin);
        }
    }


    function handleDisplayLogout() {
        setLogin(false);
        window.localStorage.removeItem("user");
        setUser({});
    }

    function handleUser(data) {
        console.log(data);
        setUser(data);
    }
    const handleNewUserMessage = (newMessage) => {
        addResponseMessage('Welcome to this **awesome** chat!');
    };


    return (
        <div className="App">
            <BrowserRouter>
                <div className="app-container">
                    <Header handleDisplay={handleDisplay}
                            handleDisplayCart={handleDisplayCart}
                            handleDisplaySearch={handleDisplaySearch}
                            handleDisplayLogin={handleDisplayLogin}
                            handleDisplayLogout={handleDisplayLogout}
                            handleDisplayMenu={handleDisplayMenu}
                            totalItems={totalQuantity}
                            login={login}
                    />
                    {
                        displayLogin && <Login handleDisplayLogin={handleDisplayLogin}
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
                    {
                        displayMenu && <Admin
                        />
                    }
                    <Widget
                        handleNewUserMessage={handleNewUserMessage}
                        title="Tư vấn khách hàng"
                    />
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
                            path="/admin"
                            exact
                        >
                            <Admin/>
                        </Route>
                        <Route
                            path="/admin/order"
                            exact
                        >
                            <Order/>
                        </Route>
                        <Route
                            path="/admin/item"
                            exact
                        >
                            <ItemQl/>
                        </Route>
                        <Route
                            path="/admin/account"
                            exact
                        >
                            <Account/>
                        </Route>
                        <Route
                            path="/admin/item/:id"
                            exact
                        >
                            <UpdateItem/>
                        </Route>
                        <Route
                            path="/admin/upload"
                            exact
                        >
                            <Upload/>
                        </Route>
                        <Route
                            path="/collection/:id"
                            exact
                        >
                            <Item addCart={addCart}/>
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
                        <Route
                            path="/paypal"
                            exact
                        >
                            <Paypal items={cart}
                                    user={user}
                            />
                        </Route>
                        <Route
                            path="/pay/success"
                            exact
                        >
                            <PaySuccess items={cart}
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
