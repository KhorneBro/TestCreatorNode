import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {CreateTest,} from "./CreateTest";
import {AllTest} from "./AllTest";
import {DetailUserPage} from "./DetailUserPage";
import {RegistrationPage} from "./RegistarationPage";
import {AuthPage} from "./AuthPage"
import {AllUsers} from "./AllUsers";


export const useRoutes = (isAuthenticated, userStatus) => {
    console.log('Routes: auth ', isAuthenticated, ', status', userStatus)

    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/createTest">
                    <CreateTest/>
                </Route>
                <Route exact path="/allUsers">
                    <AllUsers/>
                </Route>
                <Route exact  path="/allTests">
                    <AllTest/>
                </Route>
                <Route exact path="/user/:id">
                    <DetailUserPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/login">
                <AuthPage/>
            </Route>
            <Route exact path="/registration">
                <RegistrationPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}