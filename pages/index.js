import Head from 'next/head'
import axios from 'axios'
import { API_PR } from '../components/constants'
import Layout from '../components/Layout'
import Link from 'next/link'
export default function Home({products}) {
  return (
    <Layout>
      <div>
        <ul>
          {
            products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <li className="border shadow-sm px-2 py-2 mb-2">
                  <p>
                    {product.name}
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>{product.price}</p>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { data: products } = await axios.get(API_PR)
  return {
    props: {
      products,
    }
  }
}
