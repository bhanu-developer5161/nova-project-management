import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";


function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_projects: 0,
    total_tasks: 0,
    completed_tasks: 0,
    in_progress_tasks: 0,
    pending_tasks: 0,
    completion_percentage: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/");

        setStats(response.data);

      } catch (err) {
        setError("Unable to load dashboard.");

        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, [navigate]);


  if (loading) {
    return (
      <h2 style={{ padding: "30px" }}>
        Loading dashboard...
      </h2>
    );
  }


  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="main-content">

        <div className="dashboard">

          <main className="dashboard-content">

            {/* Welcome Section */}
            <div className="welcome-section">

              <h2>Dashboard</h2>

              <p>
                Here's an overview of your team's productivity.
              </p>

            </div>


            {/* Error Message */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}


            {/* Statistics */}
            <div className="stats-grid">

              <div className="stat-card">
                <h3>Total Projects</h3>

                <p>
                  {stats.total_projects}
                </p>
              </div>


              <div className="stat-card">
                <h3>Total Tasks</h3>

                <p>
                  {stats.total_tasks}
                </p>
              </div>


              <div className="stat-card">
                <h3>Completed</h3>

                <p>
                  {stats.completed_tasks}
                </p>
              </div>


              <div className="stat-card">
                <h3>In Progress</h3>

                <p>
                  {stats.in_progress_tasks}
                </p>
              </div>


              <div className="stat-card">
                <h3>Pending</h3>

                <p>
                  {stats.pending_tasks}
                </p>
              </div>

            </div>


            {/* Progress */}
            <div className="progress-card">

              <div className="progress-header">

                <div>

                  <h3>
                    Overall Progress
                  </h3>

                  <p>
                    Task completion across your projects
                  </p>

                </div>


                <strong>
                  {stats.completion_percentage}%
                </strong>

              </div>


              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${stats.completion_percentage}%`,
                  }}
                />

              </div>

            </div>


            {/* Quick Actions */}
            <div className="dashboard-actions">

              <button
                onClick={() => navigate("/projects")}
              >
                Manage Projects
              </button>


              <button
                onClick={() => navigate("/tasks")}
              >
                Manage Tasks
              </button>


              <button
                onClick={() => navigate("/team")}
              >
                View Team
              </button>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}


export default Dashboard;