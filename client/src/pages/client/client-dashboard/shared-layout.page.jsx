import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "../../../components";

const SharedLayout = () => (
  <div>
    <main className="dashboard">
      <div>
        <DashboardNavbar />
        <div style={{marginTop: '5em'}} />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

export default SharedLayout;
