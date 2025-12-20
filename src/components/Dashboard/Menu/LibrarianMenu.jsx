import React from 'react'
import MenuItem from './MenuItem'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { FaClipboardList } from 'react-icons/fa'

const LibrarianMenu = ({ isCollapsed }) => {
  return (
    <>
      <MenuItem
        icon={AiOutlinePlus}
        label="Add Book"
        address="/dashboard/add-book"
        isCollapsed={isCollapsed}
      />
      <MenuItem icon={BsBook} label="My Books" address="/dashboard/my-books" />
      <MenuItem
        icon={FaClipboardList}
        label="Orders"
        address="/dashboard/orders"
        isCollapsed={isCollapsed}
      />
    </>
  )
}

export default LibrarianMenu
