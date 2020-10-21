import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {CreateTest,} from "./pages/CreateTest";
import {AllTest} from "./pages/AllTest";
import {PersonPage} from "./pages/PersonPage";
import {AuthPage} from "./pages/AuthPage";


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/createTest" exact>
                    <CreateTest/>
                </Route>
                <Route path="/allTests" exact>
                    <AllTest/>
                </Route>
                <Route path="/personPage/:id">
                    <PersonPage/>
                </Route>
                <Route path="/">

                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/authenticated" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/authenticated" />
        </Switch>
    )
}