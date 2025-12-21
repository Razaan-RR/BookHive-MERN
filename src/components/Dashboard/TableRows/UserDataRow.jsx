import axios from 'axios'
import { toast } from 'react-toastify'

function UserDataRow({ user, refetch }) {
  const updateRole = async (role) => {
    try {
      const adminEmail =
        localStorage.getItem('userEmail') || 'razaanreza0705@gmail.com'
      if (!adminEmail) {
        toast.error('Admin not logged in')
        return
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-role`,
        { adminEmail, email: user.email, role }
      )

      if (res.data.success) {
        toast.success(`${user.email} is now ${role}`)
        refetch()
      } else {
        toast.error('Failed to update role')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to update role')
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 border-b">{user.email}</td>
      <td className="px-4 py-2 border-b">{user.role}</td>
      <td className="px-4 py-2 border-b text-center space-x-2">
        {user.role !== 'librarian' && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => updateRole('librarian')}
          >
            Make Librarian
          </button>
        )}
        {user.role !== 'admin' && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => updateRole('admin')}
          >
            Make Admin
          </button>
        )}
      </td>
    </tr>
  )
}

export default UserDataRow
