import { promisePool } from "../../../config/db"

export default async function products(req, res) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res)
    case "POST":
      return await saveProduct(req, res)
  }
}

const saveProduct = async (req, res) => {
  const {name, description, price} = req.body
  const [ result ] = await promisePool.query("INSERT INTO product SET ?", {
    name, description, price
  })
  return res.status(200).json({
    name, price, description, id: result.insertId
  })
}

const getProducts = async (req, res) => {
  const [result] = await promisePool.query("SELECT * FROM product")
  return res.status(200).json(result)
}