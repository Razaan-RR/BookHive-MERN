import { useQuery } from '@tanstack/react-query'
import Container from '../../../components/Common/Container'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import LoadingSpinner from '../../../components/Common/LoadingSpinner'

function ManageUsers() {
  const axiosSecure = useAxiosSecure()

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure('/users')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="py-12 animate-fadeInUp">
        <h1 className="text-3xl font-extrabold mb-6">Manage Users</h1>

        <div className="overflow-x-auto card">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-(--primary)/10 text-left">
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Role</th>
                <th className="px-4 py-3 border-b text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserDataRow key={user._id} user={user} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default ManageUsers
