import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { checkFieldsExistence, generateId } from "../utils/utils.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, './../../data/users.json')

export const getAllUsers = async () => {
    try {
        return await fs.promises.readFile(dbPath)
        .then(result => JSON.parse(result.toString()).users || [])
    } catch (err) {
        console.error(err)
        return null
    }
}

export const getUserById = async (_id) => {
    return await getAllUsers()
    .then(users => users == null ? null : (users.find(user => user.id === _id) || false))
}

export const getUserByEmail = async (_email) => {
    return await getAllUsers()
    .then(users => users == null ? null : (users.find(user => user.email === _email) || false))
}

export const getValidUser = async (_email, _password) => {
    await getUserByEmail()
    .then(result => result == null ? null : !result ? false : (result.password === _password) || false)
}

export const createUser = async (user) => {
    const users = await getAllUsers()
    const id = generateId()
    let {firstName, lastName, email, password, country, profileImage, skills} = user
    if (!firstName || !lastName || !email || !password || !country || !profileImage || !skills)
        throw new Error('All the fields required.')
    const checkValidity = await checkFieldsExistence(id, email)
    if (checkValidity) throw new Error('id or email already exist.')
    users.push({id, firstName, lastName, email, password, country, profileImage, skills})
    await fs.promises.writeFile(dbPath, JSON.stringify({users}, null, 3))
    return await getAllUsers()
}

export const updateUser = async (_id, _data) => {
    let user = await getUserById(_id)
    if (!user) return false
    const { firstName = user.firstName, lastName = user.lastName, email = user.email, password = user.password,
        country = user.country, profileImage = user.profileImage, skills = user.skills } = _data
    const users = await getAllUsers()
    const index = users.findIndex(u => u.id === _id)
    users[index] = {id: _id, firstName, lastName, email, password, country, profileImage, skills}
    await fs.promises.writeFile(dbPath, JSON.stringify({users}, null, 3))
    return await getUserById(_id)
}

export const deleteUser = async (_id) => {
    return await getUserById(_id)
    .then(async user => {
        if (!user) throw new Error('No user found with this id.')
        return await getAllUsers()
    })
    .then(users => users.filter(user => user.id != _id))
    .then(async users => await fs.promises.writeFile(dbPath, JSON.stringify({users}, null, 3))
        .then(() => users)
    )
}