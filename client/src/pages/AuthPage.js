import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Button, Card, Form} from "react-bootstrap";
import {useMessage} from "../hooks/message.hooks";
import {AuthContext} from "../context/authContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <Card>
            <Card.Header as="h3">Форма регистрации</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Введите email"
                            required
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Введите имя"
                            required
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{marginRight: 15}}
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        variant="dark"
                        disabled={loading}
                        onClick={registerHandler}
                    >
                        Регистрация
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
