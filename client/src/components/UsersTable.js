import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export const UsersTable = (users) => {

    if (!users.length) {
        return <p>Ползователей не создано</p>
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Статус</th>
                <th>Дата регистрации</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.date}</td>
                        <td>
                            <Link to={`/user/${user._id}`}> Открыть</Link>
                        </td>
                    </tr>
                )
            })}

            </tbody>
        </Table>
    )
}