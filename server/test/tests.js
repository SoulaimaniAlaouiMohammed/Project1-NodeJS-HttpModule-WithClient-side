import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../service/userService.js";
import { checkFieldsExistence } from "../utils/utils.js";



// getAllUsers()
// .then(res => res == null ? console.log('failed to get users data.')
// : console.log(res))


// getUserById(1)
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



// updateUser('lWET6GFNSoe9', {
//     skills: ['Cobol', 'Arduino']
// })
// .then(response => !response ? console.log('No user found with this id.') : console.log(response))
// .catch(err => console.error(err))



// deleteUser('lWET6GFNSoe9')
// .then(result => !result ? console.log('No user found with this id.') : console.log(result))
// .catch(err => console.error(err))