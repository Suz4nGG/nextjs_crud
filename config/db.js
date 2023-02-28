const mysql = require("mysql2")

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql24',
  port: 3306,
  database: 'productsdb'
})
const promisePool = pool.promise()

export { promisePool }