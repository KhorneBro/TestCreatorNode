import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {CreateTest,} from "./CreateTest";
import {AllTest} from "./AllTest";
import {PersonPage} from "./PersonPage";
import {RegistarationPage} from "./RegistarationPage";
import {AuthPage} from "./AuthPage"
import {AllUsers} from "./AllUsers";


export const useRoutes = (isAuthenticated, status) => {
    if (isAuthenticated || status==='USER') {
        return (
            <Switch>
                <Route path="/createTest" exact>
                    <CreateTest/>
                </Route>
                <Route path="/allUsers" exact>
                    <AllUsers/>
                </Route>
                <Route path="/allTests" exact>
                    <AllTest/>
                </Route>
                <Route path="/personPage/:id">
                    <PersonPage/>
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/authenticated" exact>
                <AuthPage/>
            </Route>
            <Route path="/registration" exact>
                <RegistarationPage/>
            </Route>
            <Route path="/allUsers" exact>
                <AllUsers/>
            </Route>
            <Redirect to="/authenticated"/>
        </Switch>
    )
}