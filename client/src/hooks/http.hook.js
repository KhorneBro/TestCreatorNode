import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            // let newData;
            // newData = [];
            // let newData = data.errors.map(() => {
            //     if (data.errors[0].param === 'email') {
            //         newData[0] = data.errors[0].msg
            //         newData[1] = data.errors[1].msg
            //     }
            //     if (data.errors[0].param === 'password'){
            //         newData[1] = data.errors[0].msg
            //     }
            // })
            // const newArr = data.errors.map((arr, i) => {
            //     console.log('fro function ', arr)
            //     if (arr.param === 'email') {
            //         return arr.msg
            //     }
            //     const {msg} = arr
            //     return msg
            // })
            // const {param, msg} = newArr;
            //
            // console.log('new array', newArr)

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }


            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}