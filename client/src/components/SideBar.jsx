import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import { PiPaintBrushBold } from 'react-icons/pi'
import {FaRegBookmark} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import {uiSliceActions} from '../store/ui-slice'


const SideBar = () => {
  return (
    <div className="flex flex-col gap-8 p-4 bg-blue-400 shadow-md w-[300px] h-screen">
      <NavLink
        to="/"
        className={`${({ isActive }) =>
          isActive ? "active" : ""}, flex items-center gap-2`}
      >
        <i>
          <AiOutlineHome />
        </i>
        <p>Home</p>
      </NavLink>
      <NavLink
        to="/"
        className={`${({ isActive }) =>
          isActive ? "active" : ""}, flex items-center gap-2`}
      >
        <i>
          <GoMail />
        </i>
        <p>Messages</p>
      </NavLink>
      <NavLink
        to="/"
        className={`${({ isActive }) =>
          isActive ? "active" : ""}, flex items-center gap-2`}
      >
        <i>
          <FaRegBookmark />
        </i>
        <p>Bookmarks</p>
      </NavLink>
      <NavLink
        to="/"
        className={`${({ isActive }) =>
          isActive ? "active" : ""}, flex items-center gap-2`}
      >
        <i>
          <PiPaintBrushBold />
        </i>
        <p>Themes</p>
      </NavLink>
    </div>
  );
}

export default SideBar