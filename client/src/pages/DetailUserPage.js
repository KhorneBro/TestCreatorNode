import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from "react-router";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/authContext";
import {Card, ListGroup} from "react-bootstrap";

export const DetailUserPage = () => {
    const {request} = useHttp()
    const [user, setUser] = useState(null)
    const {token} = useContext(AuthContext)
    const userId = useParams().id

    const getUser = useCallback(async () => {
        try {
            const user = await request(`/api/users/${userId}`, `GET`, null, {
                Authorization: token
            })
            setUser(user)
        } catch (e) {
        }
    }, [token, userId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (!user) {
        return (
            <div>НЕту такого ползователя</div>
        )
    }

    return (
        <div>
            <h1>Персональные данные</h1>
            <Card style={{width: '18rem'}}>
                <Card.Header>Персональные данные</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{user.name}</ListGroup.Item>
                    <ListGroup.Item>{user.email}</ListGroup.Item>
                    <ListGroup.Item>{user.status}</ListGroup.Item>
                    <ListGroup.Item>{user.date}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    )
}