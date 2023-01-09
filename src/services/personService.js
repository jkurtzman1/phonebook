import axios from "axios"

const url = "http://localhost:3001/persons";

const getPhonebook = () =>
{
    const request = axios.get(url);
    //console.log("GetPB");
    return request.then(response => response.data);
}

const addPersonToDB = newPerson =>
{
    const request = axios.post(url, newPerson);
    return request.then(response => response.data);
}

const deletePersonFromDB = personID =>
{
    const request = axios.delete(`${url}/${personID}`);
    //console.log("Delete");
    return request.then(response => response.data);
}

const updatePerson = (id, newPerson) =>
{
    const request = axios.put(`${url}/${id}`, newPerson);
    return request.then(response => response.data);
}

export default{
    getPhonebook: getPhonebook,
    addPersonToDB: addPersonToDB,
    deletePersonFromDB: deletePersonFromDB,
    updatePerson: updatePerson
};