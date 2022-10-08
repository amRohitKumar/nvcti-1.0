import { Outlet } from "react-router-dom";
import { MentorDashboardNavbar } from "../../components";

const SharedLayoutMentor = () => (
  <div>
    <main className="dashboard">
      <div>
        <MentorDashboardNavbar />
        <div style={{marginTop: '5em'}} />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

export default SharedLayoutMentor;
