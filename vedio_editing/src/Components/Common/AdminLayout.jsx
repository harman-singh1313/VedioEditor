import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <AdminSidebar />

      <main className="ml-0 min-h-screen pt-16 md:ml-[250px] md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;