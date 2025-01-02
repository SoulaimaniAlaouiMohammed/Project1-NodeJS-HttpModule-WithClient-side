import { getAllUsers } from "../service/userService.js"
import { handleException, sendResponse } from "../utils/utils.js"



export const app = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    let {url, method} = req
    url = url.toLowerCase()

    if (url === '/api/users' && method === 'GET')
    {
        await getAllUsers()
        .then(users => users == null ? handleException(res) : sendResponse(res, 200, users))
        .catch(err => handleException(res, 500, err))
    }
    else
    {
        try {
            sendResponse(res, 404, 'Page not found.')
        } catch (err) { handleException(res) }
    }
}