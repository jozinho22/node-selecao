module.exports = async (itemsSample, table) => {
    await fetch(`http://localhost:3000/api/${table.getTableName()}/`, {
        method: 'post',
        body: JSON.stringify(itemsSample),
        headers: {'Content-Type': 'application/json'}
    })
    .then(() => {
      
    })
    .catch(err => console.log("-------ERROR----------"));
}