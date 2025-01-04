import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, getValidUser, updateUser } from "../service/userService.js"
import { handleException, sendResponse } from "../utils/utils.js"



export const app = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    let {url, method} = req

    if (url.toLowerCase() === '/api/users' && method === 'GET')
    {
        await getAllUsers()
        .then(users => users == null ? handleException(res) : sendResponse(res, 200, users))
        .catch(err => handleException(res, 500, err))
    }
    else if (url.startsWith('/api/users/') && method === 'GET')
    {
        const id = url.split('/')[3]
        await getUserById(id)
        .then(user => !user ? sendResponse(res, 404, {message: `No user found with this id: ${id}.`})
        : sendResponse(res, 200, user))
    }
    else if (url.startsWith('/api/users?') && method === 'GET')
    {
        const params = new URLSearchParams(url.split('?')[1])
        const email = params.get("email")
        try {
            await getUserByEmail(email)
            .then(user => !user ? sendResponse(res, 404, {message: `No user found with this email: ${email}.`})
            : sendResponse(res, 200, user))
        } catch (err) {handleException(res)}
    }
    else if (url.toLowerCase() === '/api/users' && method === 'POST')
    {
        let body = ""
        req.on("data", chunk => body += chunk.toString())
        req.on("end", async () => {
            try {
                body = JSON.parse(body)
                await createUser(req, body)
                .then(users => sendResponse(res, 201, users))
            } catch (err) {sendResponse(res, 400, {message: 'Email already exist, choose another email.'})}
        })
    }
    else if (url.startsWith('/api/users/') && method === 'PUT')
    {
        const id = url.split('/')[3]
        let body = ""
        req.on("data", chunk => body += chunk.toString())
        try {
            req.on("end", async () => {
                body = JSON.parse(body)
                await updateUser(id, body)
                .then(user => !user ? sendResponse(res, 404, {message: `No user found with this id: ${id}.`}) 
                : sendResponse(res, 201, user))
            })
        } catch (err) {handleException(res)}
    }
    else if (url.startsWith('/api/users/') && method === 'DELETE')
    {
        const id = url.split('/')[3]
        try {
            await deleteUser(id)
            .then(result => sendResponse(res, 200, result))
        } catch (err) {sendResponse(res, 404, {message: `No user found with this id: ${id}.`})}
    }
    else if (url === '/api/auth/login' && method === 'POST')
    {
        let body = ""
        req.on("data", chunk => body += chunk.toString())
        req.on("end", async () => {
            try {
                body = JSON.parse(body)
                await getValidUser(body.email, body.password)
                .then(user => !user ? sendResponse(res, 404, {message: `No user with this email: ${body.email}.`}) : 
                (user === 'IncPassword') ? sendResponse(res, 400, {message: 'Incorrect password.'}) : 
                sendResponse(res, 201, user))
            } catch (err) {handleException(res)}
        })
    }
    else
    {
        try {
            sendResponse(res, 404, {message: 'Page not found.'})
        } catch (err) { handleException(res) }
    }
}