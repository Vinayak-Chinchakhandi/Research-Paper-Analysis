import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchProjects } from "../services/projectService";
import { createProject } from "../services/projectService";

function Dashboard() {

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useContext(AuthContext);

    const [projects, setProjects] =
        useState([]);

    useEffect(() => {

        loadProjects();

    }, []);

    const [projectForm, setProjectForm] =
        useState({
            title: "",
            description: "",
        });


    const [showProjectForm,
        setShowProjectForm] =
        useState(false);

    const handleChange = (e) => {

        setProjectForm({
            ...projectForm,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleCreateProject =
        async () => {

            try {

                const data =
                    await createProject(
                        projectForm
                    );

                console.log(data);

                /* Refresh Projects */
                loadProjects();

                /* Clear Form */
                setProjectForm({
                    title: "",
                    description: "",
                });

                /* Open Workspace */
                navigate(
                    `/workspace/${data.id}`
                );

            } catch (error) {

                console.error(error);
            }
        };

    const loadProjects =
        async () => {

            try {

                const data =
                    await fetchProjects();

                setProjects(data);

            } catch (error) {

                console.error(error);
            }
        };

    const handleLogout = () => {

        navigate("/", { replace: true });

        setTimeout(() => {

            logout();

        }, 100);
    };

    const handleOpenProject =
        (projectId) => {

            navigate(
                `/workspace/${projectId}`
            );
        };

    return (
        <div className="
      min-h-screen
      bg-[#0B1120]
      text-white
      p-6
    ">

            {/* Header */}
            <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

                <div>

                    <h1 className="
            text-3xl
            font-bold
          ">
                        Dashboard
                    </h1>

                    <p className="
            text-gray-400
            mt-1
          ">
                        Welcome, {user?.name}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="
            bg-red-600
            hover:bg-red-700
            px-4 py-2
            rounded-xl
          "
                >
                    Logout
                </button>

            </div>

            {/* Create Project */}
            {/* Create Project */}
            <div className="
  bg-[#111827]
  p-6
  rounded-2xl
  mb-8
">

                <div className="
    flex
    items-center
    justify-between
    mb-4
  ">

                    <h2 className="
      text-xl
      font-semibold
    ">
                        Projects
                    </h2>

                    <button
                        onClick={() =>
                            setShowProjectForm(
                                !showProjectForm
                            )
                        }
                        className="
        bg-blue-600
        hover:bg-blue-700
        px-5 py-3
        rounded-xl
      "
                    >
                        + New Project
                    </button>

                </div>

                {showProjectForm && (

                    <div className="
      flex
      flex-col
      gap-4
      mt-6
    ">

                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={projectForm.title}
                            onChange={handleChange}
                            className="
          bg-gray-800
          p-3
          rounded-xl
          outline-none
        "
                        />

                        <textarea
                            name="description"
                            placeholder="Project Description"
                            value={
                                projectForm.description
                            }
                            onChange={handleChange}
                            className="
          bg-gray-800
          p-3
          rounded-xl
          outline-none
          min-h-[120px]
        "
                        />

                        <div className="
        flex
        gap-3
      ">

                            <button
                                onClick={
                                    handleCreateProject
                                }
                                className="
            bg-blue-600
            hover:bg-blue-700
            px-5 py-3
            rounded-xl
          "
                            >
                                Create
                            </button>

                            <button
                                onClick={() =>
                                    setShowProjectForm(
                                        false
                                    )
                                }
                                className="
            bg-gray-700
            hover:bg-gray-600
            px-5 py-3
            rounded-xl
          "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

            </div>

            {/* Projects */}
            <div>

                <h2 className="
          text-2xl
          font-semibold
          mb-4
        ">
                    Your Projects
                </h2>

                <div className="
          grid
          gap-4
          md:grid-cols-2
          lg:grid-cols-3
        ">

                    {projects.map((project) => (

                        <div
                            key={project.id}
                            className="
                bg-[#111827]
                p-5
                rounded-2xl
                border
                border-gray-800
              "
                        >

                            <h3 className="
                text-xl
                font-semibold
              ">
                                {project.title}
                            </h3>

                            <p className="
                text-gray-400
                mt-2
              ">
                                {project.description}
                            </p>

                            <button
                                onClick={() =>
                                    handleOpenProject(
                                        project.id
                                    )
                                }
                                className="
                  mt-4
                  bg-blue-600
                  hover:bg-blue-700
                  px-4 py-2
                  rounded-xl
                "
                            >
                                Open Workspace
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;