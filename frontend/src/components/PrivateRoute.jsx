import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const {userInfo} = useSelector(state => state.auth)
  return (
    //if user had userInfo then go to outlet mens you enetr the profile or you navigate to login
    userInfo ? <Outlet/> : <Navigate to='/' replace/>
    )
}

export default PrivateRoute