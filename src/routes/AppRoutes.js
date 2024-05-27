import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import PrivateRoutes from './PrivateRoutes';
import Users from '../components/manageUsers/User';
function AppRoutes(props) {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/" exact>
                    Home
                </Route>
                <Route path="*">404 not founds</Route>
            </Switch>
        </>
    );
}

export default AppRoutes;
