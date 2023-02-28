import axios from "axios";
import { API_PR, PAGE_EDIT } from "../../components/constants";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    await axios.delete(`${API_PR}/${id}`);
    router.push("/");
  };
  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        className="bg-red-400 hover:bg-red-500 text-gray-50 px-3 py-2 rounded "
        onClick={() => handleDelete(product.id)}
      >
        Delete
      </button>
      <button
        className="bg-green-400 hover:bg-green-500 text-gray-50 px-3 py-2 ml-4 rounded"
        onClick={() => router.push(`${PAGE_EDIT}/${product.id}`)}
      >
        Edit
      </button>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(`${API_PR}/${context.query.id}`);
  return {
    props: { product },
  };
};
