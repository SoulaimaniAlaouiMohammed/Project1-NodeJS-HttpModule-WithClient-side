import { getAllUsers } from "../service/userService.js"

export const sendResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(message, null, 3))
}

export const handleException = (res, statusCode = 500, message = 'Internal server error.') => {
    res.writeHead(statusCode, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({errorMsg: message}, null, 3))
}

export const generateId = () => {
    let id = ""
    const characters = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    let i = 1;
    while (i <= 12) {
        id += characters[Math.floor(Math.random() * (characters.length - 1))]
        i++
    }
    return id
}

export const checkFieldsExistence = async (_id, _email) => {
    const users = await getAllUsers()
    return users.some(user => user.id === _id || user.email === _email)
}