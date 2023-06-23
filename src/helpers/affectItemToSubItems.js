module.exports = (table, subTable) => {

    var subItems = [];
    var items = [];

    fetch(`http://localhost:3000/api/${subTable.getTableName()}/`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
        if (response.ok) {
            console.log("OK Appel 1")
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(function (response) {
        subItems = response;
        
        return fetch(`http://localhost:3000/api/${table.getTableName()}/`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        });
    })
    .then(function (response) {
        if (response.ok) {
            console.log("OK Appel 2")
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(function (response) {
        items = response;
        console.log(response)
        console.log(items["data"][0])
        let coachId = items["data"][0].id;
        console.log(subItems)
        subItems = subItems.data.slice(0, 3);
        subItems = subItems.map(subItem => {
            return {...subItem, ...{teacherId: coachId}} 
        })

        console.log(subItems)

        var conformSubItems = {
            students: subItems
        }
        console.log(JSON.stringify(conformSubItems))

        return fetch(`http://localhost:3000/api/${subTable.getTableName()}/`, {
            method: 'put',
            body: JSON.stringify(conformSubItems),
            headers: {'Content-Type': 'application/json'}
        })
    })
    .then(function (response) {
        if (response.ok) {
            console.log("OK Appel 3")
            console.log(response)
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(function (data) {
        console.log("Fini");
    }).catch(function (error) {
        console.warn(error);
    });

}