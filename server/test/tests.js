import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, getValidUser, updateUser } from "../service/userService.js";
import { checkFieldsExistence } from "../utils/utils.js";



// getAllUsers()
// .then(res => res == null ? console.log('failed to get users data.')
// : console.log(res))


// getUserById('LvviFG5wsruW')
// .then(res => res == null ? console.log('error accured in database, try later.') : 
// !res ? console.log('no user found with this id.') : console.log(res))
// .catch(err => console.error(err))


// console.log(generateId())



// createUser({
//     firstName: 'user2 firstName',
//     lastName: 'user2 lastName',
//     email: 'user2@email.com',
//     password: 'user2Password',
//     country: 'Morocco',
//     profileImage: 'https://picsum.photos/200/300',
//     skills: ['Java', 'C++']
// })
// .then(response => !response ? console.log('id or email already exist.') : console.log(response))
// .catch(err => console.error(err))




// checkFieldsExistence('lWET6GFNshbSoe9', 'user1@jwdbemail.com')
// .then(response => {
//     if (!response) throw new Error('id or email already exist.')
//     return
// })
// .then(() => console.log('seee.'))



// updateUser('LvviFG5wsruW', {
//     skills: ['Cobolllllll', 'Arduino']
// })
// .then(response => !response ? console.log('No user found with this id.') : console.log(response))
// .catch(err => console.error(err))



// deleteUser('lWET6GFNSoe9')
// .then(result => !result ? console.log('No user found with this id.') : console.log(result))
// .catch(err => console.error(err))


// getUserByEmail('user1@email.com')
// .then(result => !result ? console.log('No user found with this email') : console.log(result))


// getValidUser('user1@email.com', 'user1Password')
// .then(result => !result ? console.log('No user found with this email.') : (result === 'IncPassword')
//      ? console.log('Incorrect password.') : console.log(result))