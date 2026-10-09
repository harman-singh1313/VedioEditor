import React from 'react'
import AdminSidebar from '../../Components/Common/AdminSidebar'

const Admin = () => {
  return (
<div className="min-h-screen bg-[#0b0817] text-white">
      <main className="min-h-screen  p-6 md:p-10">
        <h1 className="font-serif text-4xl">
          Good morning, Admin.
        </h1>

        <p className="mt-3 text-purple-300">
          Welcome back to your dashboard.
        </p>

        {/* Dashboard content */}
       
      </main>
    </div>  )
}

export default Admin