import React from 'react'
import Layout from '../../components/Layout/Layout'

import { useAuth } from '../../context/Auth';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
   const [auth] = useAuth();

   if(!auth.user) {
        return <NavLink to="/login" />
    }
  return (
   <>
   <Layout title="Dashboard - E-Shawn" description="User Dashboard">
<h1>Dashboard</h1>
   </Layout>
   </>
  )
}

export default Dashboard
