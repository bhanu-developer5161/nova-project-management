import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";


function Team() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch team members
  const fetchMembers = async () => {
    try {
      const response = await api.get("/members/");

      setMembers(response.data);

    } catch (error) {
      console.error(
        "Error loading team members:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMembers();
  }, [navigate]);


  // Loading screen
  if (loading) {
    return (
      <div className="app-layout">

        <Sidebar />

        <div className="main-content">

          <h2 style={{ padding: "30px" }}>
            Loading team...
          </h2>

        </div>

      </div>
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


            {/* Page Header */}
            <div className="page-header">

              <div>

                <h2>
                  Team Members
                </h2>

                <p>
                  View the members working on
                  your projects.
                </p>

              </div>


              <span className="member-count">
                {members.length} Members
              </span>

            </div>


            {/* Team Members */}
            {members.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No team members found
                </h3>

                <p>
                  Create another account to add
                  more team members.
                </p>

              </div>

            ) : (

              <div className="team-grid">

                {members.map((member) => (

                  <div
                    className="member-card"
                    key={member.id}
                  >


                    {/* Avatar */}
                    <div className="member-avatar">

                      {member.username
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    {/* Member Information */}
                    <div className="member-info">

                      <h3>
                        {member.username}
                      </h3>

                      <p>
                        {member.email ||
                          "No email provided"}
                      </p>

                    </div>


                    {/* Role */}
                    <div className="member-role">
                      Team Member
                    </div>


                  </div>

                ))}

              </div>

            )}


          </main>

        </div>

      </div>

    </div>
  );
}


export default Team;