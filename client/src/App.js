import React from 'react';
import {useRoutes} from "./pages/Routes";
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/authContext";
import {NavbarAppReact} from "./components/Navbar";

function App() {
    const {token, login, userId, logout, userStatus} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, userStatus)

    return (
        <AuthContext.Provider value={{
            token, logout, login, userId, isAuthenticated, userStatus
        }}>
            <BrowserRouter>
                {isAuthenticated && <NavbarAppReact/>}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
