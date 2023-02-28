
export default function Layout({children}) {
  return (
    <>
      <h1>navbar</h1>
      <div className='bg-gray-100 h-screen p-10'>
        <div className='container mx-auto h-full'>
          {children}
        </div>
      </div>
    </>
  )
}
