exports.success = (message, data, token) => {
    return {
        message,
        data,
        token
    }
}

exports.tableNameOnSingular = (tableName) => {
    return tableName.substring(0, tableName.length - 1)
}