import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default RootLayout