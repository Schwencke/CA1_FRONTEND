const URL = "https://thomasovergaard.me/tomcat/CA1/api/person/"

/*
    .catch(err => {
        if(err.status){
            err.fullError.then(e => console.log(e.msg))
        }
        else {console.log("Network Error")}
    })

ERRORHANDELING ON SINGLE
*/


function getUsers(){
    // const options = makeOptions("GET")
    // return fetch(URL, options)
    //     .then(handleHttpErrors)
    return fetch(URL)
        .then(res => res.json())
}

function getUser(id){
    // const options = makeOptions("GET")
    // return fetch(URL+id, options)
    //     .then(handleHttpErrors)
    return fetch(URL+id)
        .then(res => res.json())
}

function getHobbies(){
    const options = makeOptions("GET")
    return fetch(URL+"hobby", options)
        .then(handleHttpErrors)
}

function getCities(){
    const options = makeOptions("GET")
    return fetch(URL+"cities", options)
        .then(handleHttpErrors)
}

function addUser(user){
    const options = makeOptions("POST",user)
    return fetch(URL, options)
        .then(handleHttpErrors)
}

function editUser(user){
    const options = makeOptions("PUT",user)
    return fetch(URL, options)
        .then(handleHttpErrors)
}

function deleteUser(id){
    const options = makeOptions("DELETE")
    return fetch(URL+id, options)
        .then(handleHttpErrors)
        .catch( err => {
            err.text().then ( errorMsg => {
                let errdiv =document.getElementById("errormsg")
                errdiv.style = "display:block"
                errdiv.style = "color:red"
                errdiv.textContent = errorMsg
            })
        })
}

const userFacade = {
    getUsers,
    getUser,
    addUser,
    getHobbies,
    getCities,
    editUser,
    deleteUser
}
function makeOptions(method, body) {
    var opts =  {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if(body){
        opts.body = JSON.stringify(body);
    }
    return opts;
}
function handleHttpErrors(res){
    if(!res.ok){throw res}
    return res.json();
}

export default userFacade