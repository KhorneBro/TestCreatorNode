import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/authContext";
import {useHttp} from "../hooks/http.hook";
import {UsersTable} from "../components/UsersTable";

export const AllUsers = () => {
    const [users, setUsers] = useState({})
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users/allUsers', 'GET', null, {
                Authorization: token
            })
            console.log(fetched)
            setUsers(fetched)
        } catch (e) {
        }
    }, [request, token])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <>
            <UsersTable links={users}/>
        </>
    )
}