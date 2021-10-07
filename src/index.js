import "./style.css"
import "@popperjs/core"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import userFacade from "./userFacade";

//show page when JS is loaded and ready
document.getElementById("all-content").style = "display:block"
var phones = []
var hobbies = []

function makeTable(content, table){
    content
        .catch(err => {
            if(err.status){
                err.fullError.then(e => console.log(e.msg))
            }
            else {console.log("Network Error")}
        })
        .then(users => {
            var tbodyRef = table
            tbodyRef.innerHTML=""
            users.all.forEach(user => {
                var newRow = tbodyRef.insertRow();
                newRow.id = "row" + user.id
                for (const property in user){
                    if (typeof user[property] !== 'object') {
                        let newCell = newRow.insertCell()
                        let newText = document.createTextNode(user[property])
                        newCell.appendChild(newText)
                    }
                }
                let hobbiesobj = user.hobbies
                let phonesobj = user.phones

                for (let key in hobbiesobj){
                    hobbies.push(hobbiesobj[key])
                }
                for (let key in phonesobj){
                    phones.push(phonesobj[key])
                }

                let cellForEditAndRemove = newRow.insertCell(-1)
                let editLink = document.createElement("button")
                let deleteLink = document.createElement("button")
                let devider = document.createElement("a")
                editLink.classList.add("btnedit")
                editLink.classList.add("btn-outline-dark")
                editLink.id = "btn" + user.id
                editLink.innerHTML = "Edit"
                editLink.setAttribute("data-bs-toggle", "modal")
                editLink.setAttribute("data-bs-target", "#myEditModal")
                deleteLink.classList.add("btndelete")
                deleteLink.classList.add("btn-outline-dark")
                deleteLink.id = user.id
                deleteLink.innerHTML = "Delete"
                devider.innerHTML = " / "
                cellForEditAndRemove.appendChild(deleteLink)
                cellForEditAndRemove.appendChild(devider)
                cellForEditAndRemove.appendChild(editLink)
                let modal =  document.getElementById("myEditModal")


                deleteLink.addEventListener('click', e =>{
                    e.preventDefault()
                    userFacade.deleteUser(user.id)
                        .then()
                        document.getElementById("errormsg").style = "color:green"
                        document.getElementById("errormsg").innerText = "SUCSESS! - Brugeren med id: " + user.id + " blev fjernet"
                        document.getElementById("row"+user.id).remove()




                })
                editLink.addEventListener('click',e => {
                    content
                        .then(
                            document.getElementById('useride').value = user.id,
                            document.getElementById('fnamee').value = user.fName,
                            document.getElementById('lnamee').value = user.lName,
                            document.getElementById('emaile').value = user.email,
                            document.getElementById('addresside').value = user.address.id,
                            document.getElementById('streete').value = user.address.street,
                            document.getElementById('addinfoe').value = user.address.additionalInfo,
                            document.getElementById('zipe').value = user.address.zipCode,
                            document.getElementById('citye').value = user.address.city,
                            // document.getElementById('phoneide').value = user.phones.id,
                            // document.getElementById('numbere').value = user.phones.number,
                            // document.getElementById('numberdesce').value = user.phones.description,
                            //document.getElementById('hobbyide').value = user.hobbies.map(),
                            // document.getElementById('hobbynamee').value = user.hobbies.name,
                            // document.getElementById('hobbydesce').value = user.hobbies.description
                        )
                })
            })
        })
}

document.getElementById("savechangebtn").addEventListener('click', e =>{
        let useride = document.getElementById('useride').value
        let fName = document.getElementById('fnamee').value
        let lName = document.getElementById('lnamee').value
        let email = document.getElementById('emaile').value
        let addressid = document.getElementById('addresside').value
        let street = document.getElementById('streete').value
        let adraddinfo = document.getElementById('addinfoe').value
        let zip = document.getElementById('zipe').value
        let city = document.getElementById('citye').value
        let phoneid = document.getElementById('phoneide').value
        let phonenumber = document.getElementById('numbere').value
        let numberdesc = document.getElementById('numberdesce').value
        let hobbyid = document.getElementById('hobbyide').value
        let hobbyname = document.getElementById('hobbynamee').value
        let hobbydesc = document.getElementById('hobbydesce').value

        let newUserObj =
            {
                id : useride,
                fName: fName,
                lName: lName,
                email: email,
                address: {
                    id: addressid,
                    street: street,
                    additionalInfo: adraddinfo,
                    zipCode: zip,
                    city: city
                },
                phones,
                hobbies,
            }
            console.log(newUserObj)
        // userFacade.editUser(newUserObj)
        //     .catch(err => {
        //         if (err.status) {
        //             err.fullError.then(e => console.log(e.msg))
        //         } else {
        //             console.log("Network Error")
        //         }
        //     })
})

function makeTableForSingleEntry(content, table){
    content
        .then(user => {
            var tbodyRef = table
            tbodyRef.innerHTML=""
            var newRow = tbodyRef.insertRow();
            for (const property in user){
                let newCell = newRow.insertCell()
                let newText = document.createTextNode(user[property])
                newCell.appendChild(newText)
            }
        })
}


document.getElementById("savebtn").addEventListener('click', e => {
    e.preventDefault()
    let fName = document.getElementById('fnamei').value
    let lName = document.getElementById('lnamei').value
    let phone = document.getElementById('phonei').value
    let street = document.getElementById('streeti').value
    let zip = document.getElementById('zipi').value
    let city = document.getElementById('cityi').value

    let newUserObj =
        {
            fName: fName,
            lName: lName,
            phone: phone,
            srt: street,
            zp: zip,
            ct: city
        }
    userFacade.addUser(newUserObj)
        .catch(err => {
            if(err.status){
                err.fullError.then(e => console.log(e.msg))
            }
            else {console.log("Network Error")}
        })
})



const usertable = document.getElementById("tbody")
makeTable(userFacade.getUsers(), usertable)


//
// makeTable(userFacade.getUsers(), usertable)

// function getUsers() {
//     userFacade.getUsers()
//         .then(users => {
//             const userRows = users.map(user =>
//              `
//       <tr>
//         <td>${user.id}</td>
//         <td>${user.firstname}</td>
//         <td>${user.lastname}</td>
//         <td>${user.phone}</td>
//         <td>${user.street}</td>
//         <td>${user.zip}</td>
//         <td>${user.city}</td>
//       </tr>
//       `)
//             const userRowsAsString = userRows.join("")
//             console.log(users)
//             document.getElementById("allUserRows").innerHTML = userRowsAsString
//         })
// }
// getUsers();

