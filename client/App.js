const API_URL = "http://localhost:5000/api/users"

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const country = document.getElementById('country')
const profileImage = document.getElementById('profileImage')
const skills = document.getElementById('skills')
const submit = document.getElementById('submit')
const tableBody = document.getElementById('tableBody')


submit.addEventListener("click", async (e) => {
    e.preventDefault()

    await sendData()
    renderTable()
})


const sendData = async () => {
    if (!firstName.value || !lastName.value || !email.value || !password.value ||
         !country.value || !profileImage.value || !skills.value) {
            alert('All the fields are required.')
            return
    }
    await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            country: country.value,
            profileImage: profileImage.value,
            skills: skills.value
        })
    })
    firstName.value = ""
    lastName.value = ""
    email.value = ""
    password.value = ""
    country.value = ""
    profileImage.value = ""
    skills.value = ""
}


const renderTable = async () => {
    const users = await fetch(API_URL).then(data => data.json())

    users.forEach(user => {
        const tableRow = document.createElement('tr')

        const id = document.createElement('td')
        id.innerText = user.id
        const fNameData = document.createElement('td')
        fNameData.innerText = user.firstName
        const lNameData = document.createElement('td')
        lNameData.innerText = user.lastName
        const emailData = document.createElement('td')
        emailData.innerText = user.email
        const passwordData = document.createElement('td')
        passwordData.innerText = user.password
        const countryData = document.createElement('td')
        countryData.innerText = user.country
        const pImageData = document.createElement('td')
        pImageData.innerText = user.profileImage
        const skillsData = document.createElement('td')
        skillsData.innerText = user.skills

        const updatebtn = document.createElement('button')
        updatebtn.setAttribute("id", "updateBtn")
        updatebtn.innerText = "update"
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("id", "deleteBtn")
        deleteBtn.innerText = "delete"

        deleteBtn.addEventListener("click", () => {
            deleteUser(user.id)
        })

        updatebtn.addEventListener("click", async (e) => {
            e.preventDefault()

            firstName.value = user.firstName
            lastName.value = user.lastName
            email.value = user.email
            password.value = user.password
            country.value = user.country
            profileImage.value = user.profileImage
            skills.value = user.skills

            submit.addEventListener("click", async (e) => {
                e.preventDefault()

                await updateUser(user.id)
            })
        })

        tableRow.appendChild(id)
        tableRow.appendChild(fNameData)
        tableRow.appendChild(lNameData)
        tableRow.appendChild(emailData)
        tableRow.appendChild(passwordData)
        tableRow.appendChild(countryData)
        tableRow.appendChild(pImageData)
        tableRow.appendChild(skillsData)
        tableRow.appendChild(updatebtn)
        tableRow.appendChild(deleteBtn)
        tableBody.appendChild(tableRow)
    })
}

const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response) {
            alert(`No user found with id: ${id}`)
            return
        }
        renderTable()
    })
}

const updateUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            country: country.value,
            profileImage: profileImage.value,
            skills: skills.value
        })
    })
    .then(response => {
        if (!response) {
            alert(`No user found with id: ${id}.`)
            return
        }
    })
}

addEventListener("DOMContentLoaded", renderTable)