import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [status, setStatus] = useState(null)

    const login = useCallback((jwtToken, id, status) => {
        setToken(jwtToken)
        setToken(id)
        setStatus(status)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            status: status
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setStatus(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.status)
        }
    }, [login])

    return {login, logout, token, userId, status}
}