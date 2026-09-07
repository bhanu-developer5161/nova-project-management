import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";


function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    deadline: "",
  });


  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects/");

      setProjects(response.data);

    } catch (error) {
      console.error("Error loading projects:", error);

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
    fetchProjects();
  }, [navigate]);


  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // Create project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects/", formData);

      setFormData({
        name: "",
        description: "",
        status: "PLANNING",
        deadline: "",
      });

      setShowForm(false);

      await fetchProjects();

    } catch (error) {
      console.error("Error creating project:", error);
      console.error("Server response:", error.response?.data);
    }
  };


  // Delete project
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete("/projects/" + id + "/");

      await fetchProjects();

    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };


  // Loading screen
  if (loading) {
    return (
      <div className="app-layout">

        <Sidebar />

        <div className="main-content">

          <h2 style={{ padding: "30px" }}>
            Loading projects...
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

                <h2>Projects</h2>

                <p>
                  Manage your team's projects.
                </p>

              </div>


              <button
                className="add-project-button"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "+ New Project"}
              </button>

            </div>


            {/* Create Project Form */}
            {showForm && (

              <div className="project-form-card">

                <h3>
                  Create New Project
                </h3>


                <form onSubmit={handleSubmit}>


                  {/* Project Name */}
                  <div className="form-group">

                    <label>
                      Project Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter project name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* Description */}
                  <div className="form-group">

                    <label>
                      Description
                    </label>

                    <textarea
                      name="description"
                      placeholder="Describe your project"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                    />

                  </div>


                  {/* Status and Deadline */}
                  <div className="project-form-row">


                    {/* Status */}
                    <div className="form-group">

                      <label>
                        Status
                      </label>

                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >

                        <option value="PLANNING">
                          Planning
                        </option>

                        <option value="ACTIVE">
                          Active
                        </option>

                        <option value="COMPLETED">
                          Completed
                        </option>

                        <option value="ON_HOLD">
                          On Hold
                        </option>

                      </select>

                    </div>


                    {/* Deadline */}
                    <div className="form-group">

                      <label>
                        Deadline
                      </label>

                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                      />

                    </div>

                  </div>


                  {/* Submit */}
                  <button type="submit">
                    Create Project
                  </button>


                </form>

              </div>

            )}


            {/* Project List */}
            {projects.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No projects yet
                </h3>

                <p>
                  Create your first project to get started.
                </p>

              </div>

            ) : (

              <div className="projects-grid">


                {projects.map((project) => (

                  <div
                    className="project-card"
                    key={project.id}
                  >


                    {/* Project Header */}
                    <div className="project-card-header">

                      <h3>
                        {project.name}
                      </h3>


                      <span
                        className={
                          "status " +
                          project.status.toLowerCase()
                        }
                      >
                        {project.status.replace("_", " ")}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="project-description">

                      {project.description ||
                        "No description provided."}

                    </p>


                    {/* Project Details */}
                    <div className="project-details">


                      <p>

                        <strong>
                          Deadline:
                        </strong>{" "}

                        {project.deadline ||
                          "Not set"}

                      </p>


                      <p>

                        <strong>
                          Owner:
                        </strong>{" "}

                        {project.owner}

                      </p>


                    </div>


                    {/* Delete Button */}
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(project.id)
                      }
                    >
                      Delete
                    </button>


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


export default Projects;