import React from 'react'
import MenuItem from './MenuItem'
import { FaUsers } from 'react-icons/fa'
import { BsBook } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUsers}
        label="Manage Users"
        address="/dashboard/manage-users"
      />
      <MenuItem
        icon={BsBook}
        label="Manage Books"
        address="/dashboard/manage-books"
      />
    </>
  )
}

export default AdminMenu
