import React from 'react'
import MenuItem from './MenuItem'
import { FaUsers } from 'react-icons/fa'
import { BsBook } from 'react-icons/bs'

const AdminMenu = ({ isCollapsed }) => {
  return (
    <>
      <MenuItem
        icon={FaUsers}
        label="Manage Users"
        address="/dashboard/manage-users"
        isCollapsed={isCollapsed}
      />
      <MenuItem
        icon={BsBook}
        label="Manage Books"
        address="/dashboard/manage-books"
        isCollapsed={isCollapsed}
      />
    </>
  )
}

export default AdminMenu
