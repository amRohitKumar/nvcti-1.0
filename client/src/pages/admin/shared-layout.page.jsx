import { Outlet } from "react-router-dom";
import { AdminDashboardNavbar } from "../../components";
import { useUserState } from "../../hooks";

const SharedLayoutAdmin = () => {
  useUserState("LOGOUT", "/");
  return (
    <div>
      <main className="dashboard">
        <div>
          <AdminDashboardNavbar />
          <div style={{ marginTop: "5em" }} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedLayoutAdmin;
