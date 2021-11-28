import logo from './logo.svg';
import './App.css';
import Form from "./components/Form/Form";
import Users from "./components/Users/Users";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Profile from "./components/Form/Profile";
import ProtectedRoute from "./components/Protected/Protected";
import Room from "./components/layout/Room";
import {useSelector} from "react-redux";
import {isLoaded} from "react-redux-firebase";
import Loader from "./components/layout/Loader";
import Main from "./components/layout/Main";
import ProjectView from "./components/Projects/ProjectView";
import Table from "./components/Table/Table";
import Order from "./components/Form/Order";
import Market from "./components/Market/Market";
import Account from "./components/Account/Account";


function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <Loader/>;
    return children
}

function App() {
    return (
        <BrowserRouter>
            <AuthIsLoaded>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    // Форма заказа
                    <Route exact path="/order" component={Order}/>
                    <Route exact path="/project/:id" loggedIn="false" component={ProjectView}/>
                    <Route exact path="/table" loggedIn="false" component={Table}/>
                    <Route exact path="/market" loggedIn="false" component={Market}/>
                    <Route exact path="/signin" loggedIn="false" component={SignIn}/>
                    <Route exact path="/signup" loggedIn="false" component={SignUp}/>
                    <ProtectedRoute path="/profile" loggedIn="true" component={Profile}/>
                    <ProtectedRoute path="/account" loggedIn="true" component={Account}/>
                    <ProtectedRoute path="/users" loggedIn="true" component={Users}/>
                    <ProtectedRoute path="/room" loggedIn="true" component={Room}/>
                </Switch>
                </AuthIsLoaded>
        </BrowserRouter>
    );
}

export default App;
