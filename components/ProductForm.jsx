import axios from "axios";
import { useState, useEffect } from "react";
import { API_PR } from "./constants";
import { useRouter } from "next/router";

export default function ProductForm() {
  const router = useRouter();
  //* veremos desde donde nos visitan
  console.log(router.query);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // * Enviamos a nuestro backend
    if (router.query.id) {
      console.log("UPDATE")
      const res = await axios.put(`${API_PR}/${router.query.id}`, product)
      console.log(res)
    } else {
      const res = await axios.post(API_PR, product);
      console.log(res)
    }
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => setProduct({ ...product, [name]: value });
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`${API_PR}/${router.query.id}`);
      setProduct({
        name: data.name,
        description: data.description,
        price: data.price
      })
    };
    if (router.query.id) {
      getProduct()
    }
  }, [router.query.id]);
  return (
    <form
      className="shadow-md flex flex-col bg-gray-100 px-2 pt-6 mb-4 text-gray-600 rounded"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        className="rounded shadow-sm border py-2 px-3"
        value={product.name}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        rows="2"
        onChange={handleChange}
        className="rounded shadow-sm border py-2 px-3 "
        value={product.description}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        onChange={handleChange}
        className="rounded shadow-sm border py-2 px-3 "
        value={product.price}
      />
      <button className="rounded text-gray-50 bg-blue-500 hover:bg-blue-600 px-2 py-2 mt-4 focus:outline-none focus:shadow-outline">
        {
          router.query.id ? 'Update Product' : 'Save Product'
        }
      </button>
    </form>
  );
}
