import { Outlet } from "react-router-dom";
import { ClientDashboardNavbar } from "../../components";
import { useUserState } from "../../hooks";

const SharedLayoutClient = () => {
  useUserState("LOGOUT", "/");  
  return (
    <div>
      <main className="dashboard">
        <div>
          <ClientDashboardNavbar />
          <div style={{ marginTop: "5em" }} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedLayoutClient;
