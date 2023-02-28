// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "../../config/db"

export default async function handler(req, res) {
  pool.query("SELECT NOW()", function(err, rows, fields) {
    console.log(rows)
    res.status(200).json(rows)
  })
}
