import { Outlet } from "react-router-dom";
import { AdminDashboardNavbar } from "../../../components";

const SharedLayoutAdmin = () => (
  <div>
    <main className="dashboard">
      <div>
        <AdminDashboardNavbar />
        <div style={{marginTop: '5em'}} />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

export default SharedLayoutAdmin;
