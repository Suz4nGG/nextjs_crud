import { promisePool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res)
  }
}

const getProduct = async (req, res) => {
  const { id } = req.query;
  const [result] = await promisePool.query(
    "SELECT * FROM product WHERE id = ?",
    [id]
  );
  console.log("RES", result[0]);
  return res.status(200).json(result[0]);
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  await promisePool.query("DELETE FROM product WHERE id = ?", [id]);
  return res.status(204).json();
};

const updateProduct = async (req, res) => {
  const { id } = req.query
  const {name, description, price} = req.body
  try {
    await promisePool.query("UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?", [name, description, price, id])
    return res.status(204).json("UPDATE")
  } catch (err) {
    console.log(err)
  }
}
