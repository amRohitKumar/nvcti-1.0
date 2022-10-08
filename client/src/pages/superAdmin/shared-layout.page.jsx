import { Outlet } from "react-router-dom";
import { SuperAdminDashboardNavbar } from "../../components";

const SharedLayoutSuperAdmin = () => (
  <div>
    <main className="dashboard">
      <div>
        <SuperAdminDashboardNavbar />
        <div style={{marginTop: '5em'}} />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

export default SharedLayoutSuperAdmin;
