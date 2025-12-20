import React from 'react'
import MenuItem from './MenuItem'
import { AiOutlineBook } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'
import { FaFileInvoiceDollar } from 'react-icons/fa'

const UserMenu = ({ isCollapsed }) => {
  return (
    <>
      <MenuItem
        icon={AiOutlineBook}
        label="My Orders"
        address="/dashboard/my-orders"
        isCollapsed={isCollapsed}
      />
      <MenuItem
        icon={MdFavorite}
        label="Wishlist"
        address="/dashboard/wishlist"
        isCollapsed={isCollapsed}
      />
      <MenuItem
        icon={FaFileInvoiceDollar}
        label="Invoices"
        address="/dashboard/invoices"
        isCollapsed={isCollapsed}
      />
    </>
  )
}

export default UserMenu
