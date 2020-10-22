import React, {useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Button, Card, Form} from "react-bootstrap";

export const RegistrationPage = () => {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', name: '', telegram: ''
    })
    const [validated, setValidated] = useState(false)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        form.touched = true
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true);
    };

    const registerHandler = async (event) => {
        try {
            await request('/api/auth/register', 'POST', {...form})
            const form = event.target
            form.reset()
        } catch (e) {
        }
    }

    return (
        <Card>
            <Card.Header as="h3">Форма регистрации</Card.Header>
            <Card.Body>
                <Card.Text>Если у вас уже ест аккаунт нажмите "Войти в аккаунт"</Card.Text>

                <Form  validated={validated} onClick={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Введите email"
                            required
                            onChange={changeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите корректный email
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            Пароль должен быть более 3 символов
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Введите имя"
                            required
                            onChange={changeHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                            Не должно быть пустым
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="telegram">
                        <Form.Label>Телеграм</Form.Label>
                        <Form.Control
                            type="text"
                            name="telegram"
                            placeholder="Введите ваш телеграм ID(не обязательное поле)"
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="dark"
                        disabled={loading}
                        onClick={registerHandler}
                    >
                        Регистрация
                    </Button>
                </Form>
                <Button
                    className="pull-right"
                    href="/authenticated"
                    variant="primary"
                    type="submit"
                    style={{}}
                    disabled={loading}
                >
                    Войти в аккаунт
                </Button>
            </Card.Body>
        </Card>
    )
}
