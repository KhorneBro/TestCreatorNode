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
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
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
            <Card.Header as="h3">Войти в Аккаунт</Card.Header>
            <Card.Body>
                <Card.Text>Нажмите "Зарегистрироватся" для создания нового аккаунта</Card.Text>
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

                </Form>
                <Button
                    href="/registration"
                    variant="dark"
                    disabled={loading}
                >
                    Зарегистрироватся
                </Button>
            </Card.Body>

        </Card>
    )
}
