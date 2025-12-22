// import React, { useEffect, useState } from 'react'
// import { FaEdit } from 'react-icons/fa'
// import axios from 'axios'

// function MyBooks() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/books`
//         )
//         setBooks(data)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBooks()
//   }, [])

//   if (loading) {
//     return <div className="p-10 text-center">Loading books...</div>
//   }

//   return (
//     <div className="min-h-screen px-6 py-10 animate-fadeInUp">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">My Books</h1>
//         <p className="opacity-80">
//           Manage all books added by you. Books can be edited or unpublished.
//         </p>
//       </div>

//       <div className="card overflow-x-auto">
//         <div
//           className="flex items-center justify-between mb-4 p-4 rounded-lg text-white"
//           style={{ backgroundColor: 'var(--primary)' }}
//         >
//           <h2 className="text-lg font-semibold">
//             Books Inventory ({books.length})
//           </h2>
//         </div>

//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="text-left text-sm uppercase tracking-wide opacity-70">
//               <th className="p-3">Book</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {books.map((book) => (
//               <tr
//                 key={book._id}
//                 className="border-t hover:bg-(--hover) transition"
//               >
//                 <td className="p-3">
//                   <div
//                     className="h-14 w-10 rounded-md overflow-hidden border-2"
//                     style={{ borderColor: 'var(--secondary)' }}
//                   >
//                     <img
//                       src={book.image}
//                       alt={book.name}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                 </td>

//                 <td className="p-3 font-medium">{book.name}</td>

//                 <td className="p-3">
//                   {book.status === 'published' ? (
//                     <span
//                       className="px-3 py-1 text-xs rounded-full font-semibold"
//                       style={{
//                         backgroundColor: 'rgba(37,99,235,0.1)',
//                         color: 'var(--primary)',
//                       }}
//                     >
//                       Published
//                     </span>
//                   ) : (
//                     <span
//                       className="px-3 py-1 text-xs rounded-full font-semibold"
//                       style={{
//                         backgroundColor: 'rgba(250,204,21,0.2)',
//                         color: '#92400e',
//                       }}
//                     >
//                       Unpublished
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-3 text-right">
//                   <button
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg border transition"
//                     style={{
//                       borderColor: 'var(--primary)',
//                       color: 'var(--primary)',
//                     }}
//                   >
//                     <FaEdit size={14} />
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {books.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="p-6 text-center opacity-70">
//                   No books added yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default MyBooks

import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'

function MyBooks() {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.email) return

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/librarian/${user.email}`
        )
        setBooks(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [user])

  if (loading) {
    return <div className="p-10 text-center">Loading books...</div>
  }

  return (
    <div className="min-h-screen px-6 py-10 animate-fadeInUp">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Books</h1>
        <p className="opacity-80">
          Manage all books added by you. Books can be edited or unpublished.
        </p>
      </div>

      <div className="card overflow-x-auto">
        <div
          className="flex items-center justify-between mb-4 p-4 rounded-lg text-white"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <h2 className="text-lg font-semibold">
            Books Inventory ({books.length})
          </h2>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm uppercase tracking-wide opacity-70">
              <th className="p-3">Book</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-t hover:bg-(--hover) transition"
              >
                <td className="p-3">
                  <div
                    className="h-14 w-10 rounded-md overflow-hidden border-2"
                    style={{ borderColor: 'var(--secondary)' }}
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>

                <td className="p-3 font-medium">{book.name}</td>

                <td className="p-3">
                  {book.status === 'published' ? (
                    <span
                      className="px-3 py-1 text-xs rounded-full font-semibold"
                      style={{
                        backgroundColor: 'rgba(37,99,235,0.1)',
                        color: 'var(--primary)',
                      }}
                    >
                      Published
                    </span>
                  ) : (
                    <span
                      className="px-3 py-1 text-xs rounded-full font-semibold"
                      style={{
                        backgroundColor: 'rgba(250,204,21,0.2)',
                        color: '#92400e',
                      }}
                    >
                      Unpublished
                    </span>
                  )}
                </td>

                <td className="p-3 text-right">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border transition"
                    style={{
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)',
                    }}
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center opacity-70">
                  No books added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBooks
