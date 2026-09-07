import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";


function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assigned_to: "",
    priority: "MEDIUM",
    status: "TODO",
    due_date: "",
  });


  // Fetch tasks, projects and members
  const fetchData = async () => {
    try {
      const [tasksResponse, projectsResponse, membersResponse] =
        await Promise.all([
          api.get("/tasks/"),
          api.get("/projects/"),
          api.get("/members/"),
        ]);

      setTasks(tasksResponse.data);
      setProjects(projectsResponse.data);
      setMembers(membersResponse.data);

    } catch (error) {
      console.error("Error loading task data:", error);

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
    fetchData();
  }, [navigate]);


  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      project: "",
      assigned_to: "",
      priority: "MEDIUM",
      status: "TODO",
      due_date: "",
    });

    setEditingTask(null);
    setShowForm(false);
  };


  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        assigned_to: formData.assigned_to || null,
        due_date: formData.due_date || null,
      };

      if (editingTask) {
        await api.put(
          "/tasks/" + editingTask.id + "/",
          data
        );
      } else {
        await api.post("/tasks/", data);
      }

      resetForm();

      await fetchData();

    } catch (error) {
      console.error("Error saving task:", error);
      console.error("Server response:", error.response?.data);
    }
  };


  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description || "",
      project: task.project,
      assigned_to: task.assigned_to || "",
      priority: task.priority,
      status: task.status,
      due_date: task.due_date || "",
    });

    setShowForm(true);
  };


  // Delete task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete("/tasks/" + id + "/");

      await fetchData();

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  // Change task status
  const handleStatusChange = async (task, newStatus) => {
    try {
      await api.patch(
        "/tasks/" + task.id + "/",
        {
          status: newStatus,
        }
      );

      await fetchData();

    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };


  // Loading screen
  if (loading) {
    return (
      <div className="app-layout">

        <Sidebar />

        <div className="main-content">

          <h2 style={{ padding: "30px" }}>
            Loading tasks...
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

                <h2>Tasks</h2>

                <p>
                  Manage and track your team's tasks.
                </p>

              </div>


              <button
                className="add-project-button"
                onClick={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                  }
                }}
              >
                {showForm ? "Cancel" : "+ New Task"}
              </button>

            </div>


            {/* Task Form */}
            {showForm && (

              <div className="project-form-card">

                <h3>
                  {editingTask
                    ? "Edit Task"
                    : "Create New Task"}
                </h3>


                <form onSubmit={handleSubmit}>


                  {/* Task Title */}
                  <div className="form-group">

                    <label>
                      Task Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      placeholder="Enter task title"
                      value={formData.title}
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
                      placeholder="Describe the task"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                    />

                  </div>


                  {/* Project and Member */}
                  <div className="project-form-row">


                    {/* Project */}
                    <div className="form-group">

                      <label>
                        Project
                      </label>

                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select a project
                        </option>


                        {projects.map((project) => (

                          <option
                            key={project.id}
                            value={project.id}
                          >
                            {project.name}
                          </option>

                        ))}

                      </select>

                    </div>


                    {/* Assign To */}
                    <div className="form-group">

                      <label>
                        Assign To
                      </label>

                      <select
                        name="assigned_to"
                        value={formData.assigned_to}
                        onChange={handleChange}
                      >

                        <option value="">
                          Unassigned
                        </option>


                        {members.map((member) => (

                          <option
                            key={member.id}
                            value={member.id}
                          >
                            {member.username}
                          </option>

                        ))}

                      </select>

                    </div>


                  </div>


                  {/* Priority and Status */}
                  <div className="project-form-row">


                    {/* Priority */}
                    <div className="form-group">

                      <label>
                        Priority
                      </label>

                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >

                        <option value="LOW">
                          Low
                        </option>

                        <option value="MEDIUM">
                          Medium
                        </option>

                        <option value="HIGH">
                          High
                        </option>

                      </select>

                    </div>


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

                        <option value="TODO">
                          To Do
                        </option>

                        <option value="IN_PROGRESS">
                          In Progress
                        </option>

                        <option value="COMPLETED">
                          Completed
                        </option>

                      </select>

                    </div>


                  </div>


                  {/* Due Date */}
                  <div className="form-group">

                    <label>
                      Due Date
                    </label>

                    <input
                      type="date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleChange}
                    />

                  </div>


                  {/* Submit Button */}
                  <button type="submit">

                    {editingTask
                      ? "Save Changes"
                      : "Create Task"}

                  </button>


                </form>

              </div>

            )}


            {/* Task List */}
            {tasks.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No tasks yet
                </h3>

                <p>
                  Create your first task and assign it
                  to a project.
                </p>

              </div>

            ) : (

              <div className="tasks-container">


                {tasks.map((task) => (

                  <div
                    className="task-card"
                    key={task.id}
                  >


                    {/* Task Information */}
                    <div className="task-main">

                      <h3>
                        {task.title}
                      </h3>

                      <p>
                        {task.description ||
                          "No description provided."}
                      </p>

                    </div>


                    {/* Project */}
                    <div className="task-project">

                      <span>
                        Project
                      </span>

                      <strong>
                        {task.project_name}
                      </strong>

                    </div>


                    {/* Priority */}
                    <div className="task-info">

                      <span>
                        Priority
                      </span>

                      <strong>
                        {task.priority}
                      </strong>

                    </div>


                    {/* Status */}
                    <div className="task-info">

                      <span>
                        Status
                      </span>


                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task,
                            e.target.value
                          )
                        }
                      >

                        <option value="TODO">
                          To Do
                        </option>

                        <option value="IN_PROGRESS">
                          In Progress
                        </option>

                        <option value="COMPLETED">
                          Completed
                        </option>

                      </select>

                    </div>


                    {/* Assigned Member */}
                    <div className="task-info">

                      <span>
                        Assigned To
                      </span>

                      <strong>
                        {task.assigned_to_username ||
                          "Unassigned"}
                      </strong>

                    </div>


                    {/* Due Date */}
                    <div className="task-info">

                      <span>
                        Due Date
                      </span>

                      <strong>
                        {task.due_date || "Not set"}
                      </strong>

                    </div>


                    {/* Actions */}
                    <div className="task-actions">


                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(task)
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(task.id)
                        }
                      >
                        Delete
                      </button>


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


export default Tasks;