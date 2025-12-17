import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { toast } from 'react-hot-toast'

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleMakeAdmin = async () => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${user.email}`)
      if (res.data.modifiedCount > 0) {
        toast.success(`${user.email} is now an Admin`)
        refetch()
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to make admin')
    }
  }

  const handleMakeLibrarian = async () => {
    try {
      const res = await axiosSecure.patch(`/users/librarian/${user.email}`)
      if (res.data.modifiedCount > 0) {
        toast.success(`${user.email} is now a Librarian`)
        refetch()
      }
    } catch (err) {
      console.log(err)
      toast.error('Failed to make librarian')
    }
  }

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.email}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="capitalize">{user?.role || 'user'}</span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-2">
          <button
            disabled={user?.role === 'admin'}
            onClick={handleMakeAdmin}
            className="px-3 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
          >
            Make Admin
          </button>

          <button
            disabled={user?.role === 'librarian'}
            onClick={handleMakeLibrarian}
            className="px-3 py-1 text-white bg-green-600 rounded disabled:opacity-50"
          >
            Make Librarian
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserDataRow
