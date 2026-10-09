import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/projects";

const emptyVideo = () => ({
  video: null,
  poster: null,
});

const AdminForm = () => {
  const [project, setProject] = useState({
    title: "",
    category: "",
    description: "",
    status: "draft",
    coverImages: [],
    videos: [emptyVideo()],
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = sessionStorage.getItem("adminToken");
  // ---------------- GET PROJECTS ----------------
  const getProjects = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (res.ok) {
        setProjects(data.projects || data);
      }
    } catch (error) {
      console.error("GET ERROR:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // ---------------- BASIC CHANGE ----------------
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- COVER IMAGES ----------------
  const handleCoverImages = (e) => {
    setProject({
      ...project,
      coverImages: Array.from(e.target.files).slice(0, 10),
    });
  };

  // ---------------- VIDEO / POSTER ----------------
  const handleVideo = (index, field, file) => {
    const videos = [...project.videos];

    videos[index] = {
      ...videos[index],
      [field]: file,
    };

    setProject({
      ...project,
      videos,
    });
  };

  // ---------------- ADD VIDEO ----------------
  const addVideo = () => {
    if (project.videos.length >= 10) return;

    setProject({
      ...project,
      videos: [...project.videos, emptyVideo()],
    });
  };

  // ---------------- REMOVE VIDEO ----------------
  const removeVideo = (index) => {
    setProject({
      ...project,
      videos: project.videos.filter((_, i) => i !== index),
    });
  };

  // ---------------- EDIT PROJECT ----------------
  const handleEdit = (item) => {
    setEditId(item._id);

    setProject({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      status: item.status || "draft",
      coverImages: [],
      videos: [emptyVideo()],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------- CANCEL EDIT ----------------
  const cancelEdit = () => {
    setEditId(null);

    setProject({
      title: "",
      category: "",
      description: "",
      status: "draft",
      coverImages: [],
      videos: [emptyVideo()],
    });
  };

  // ---------------- DELETE PROJECT ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Project delete failed");
      }

      alert("Project deleted successfully!");

      getProjects();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert(error.message);
    }
  };

  // ---------------- CREATE / UPDATE PROJECT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!project.title || !project.category) {
      alert("Title and category are required");
      return;
    }

    // ---------------- COLOR GRADING VALIDATION ----------------
    // Color Grading = 1 to 10 images
    if (!editId && project.category === "color-grading") {
      if (
        project.coverImages.length < 1 ||
        project.coverImages.length > 10
      ) {
        alert("Color Grading needs 1 to 10 images");
        return;
      }
    }

    // ---------------- OTHER CATEGORIES VIDEO VALIDATION ----------------
    if (!editId && project.category !== "color-grading") {
      for (let i = 0; i < project.videos.length; i++) {
        const item = project.videos[i];

        if (!item.video || !item.poster) {
          alert(`Video ${i + 1} needs both video and poster`);
          return;
        }
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // ---------------- TEXT FIELDS ----------------
      formData.append("title", project.title);
      formData.append("category", project.category);
      formData.append("description", project.description);
      formData.append("status", project.status);

      // ---------------- COVER IMAGES ----------------
      project.coverImages.forEach((file) => {
        formData.append("coverImages", file);
      });

      // ---------------- VIDEOS + POSTERS ----------------
      if (project.category !== "color-grading") {
        project.videos.forEach((item) => {
          formData.append("video", item.video);
          formData.append("poster", item.poster);
        });
      }

      // ---------------- CREATE / UPDATE ----------------
      const res = editId
        ? await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({
            title: project.title,
            category: project.category,
            description: project.description,
            status: project.status,
          }),
        })
        : await fetch(API, {
          method: "POST",
          headers:{
            Authorization:`Bearer ${token}`,
          },
          body: formData,
        });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
          (editId
            ? "Project update failed"
            : "Project creation failed"),
        );
      }

      alert(
        editId
          ? "Project updated successfully!"
          : "Project created successfully!",
      );

      // ---------------- RESET EDIT MODE ----------------
      setEditId(null);

      // ---------------- RESET FORM ----------------
      setProject({
        title: "",
        category: "",
        description: "",
        status: "draft",
        coverImages: [],
        videos: [emptyVideo()],
      });

      // ---------------- REFRESH PROJECTS ----------------
      getProjects();
    } catch (error) {
      console.error("CREATE ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a18] p-4 text-white sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Project Management
          </h1>

          <p className="mt-1 text-sm text-[#a9a1bd]">
            Create and manage your video editing projects
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#302744] bg-[#151124] p-4 sm:p-6"
        >
          <h2 className="mb-5 text-xl font-semibold">
            {editId ? "Edit Project" : "Add New Project"}
          </h2>

          {/* TITLE + CATEGORY */}
          <div className="grid gap-5 md:grid-cols-2">

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm">
                Project Title
              </label>

              <input
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full rounded-lg border border-[#302744] bg-[#0f0c1c] px-4 py-3 outline-none focus:border-[#a63cff]"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm">
                Category
              </label>

              <select
                name="category"
                value={project.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#302744] bg-[#0f0c1c] px-4 py-3 outline-none focus:border-[#a63cff]"
              >
                <option value="">Select category</option>

                <option value="short-film">
                  Short Film
                </option>

                <option value="long-form">
                  Long Form
                </option>

                <option value="color-grading">
                  Color Grading
                </option>

                <option value="hero-video">
                  Hero Video
                </option>


                <option value="other-edits">
                  Other Edits
                </option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-5">
            <label className="mb-2 block text-sm">
              Description
            </label>

            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write project description..."
              className="w-full resize-none rounded-lg border border-[#302744] bg-[#0f0c1c] px-4 py-3 outline-none focus:border-[#a63cff]"
            />
          </div>

          {/* STATUS */}
          <div className="mt-5 md:w-1/3">
            <label className="mb-2 block text-sm">
              Status
            </label>

            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#302744] bg-[#0f0c1c] px-4 py-3 outline-none focus:border-[#a63cff]"
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </div>

          {/* COVER IMAGES */}
          <div className="mt-8 border-t border-[#302744] pt-6">
            <h3 className="text-lg font-semibold">
              Cover Images
            </h3>

            <p className="mt-1 text-sm text-[#a9a1bd]">
              {project.category === "color-grading"
                ? "Select 1 to 10 images"
                : "Select up to 10 images"}
            </p>

            <label className="mt-4 flex min-h-[150px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#302744] bg-[#0f0c1c] p-6 hover:border-[#a63cff]">
              <div className="text-center">

                <div className="mb-3 text-3xl text-[#a63cff]">
                  +
                </div>

                <p className="font-medium">
                  Choose Cover Images
                </p>

                <p className="mt-1 text-xs text-[#777087]">
                  JPG, PNG, WEBP
                </p>

              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleCoverImages}
                className="hidden"
              />
            </label>

            {/* IMAGE PREVIEW */}
            {project.coverImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {project.coverImages.map((file, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-[#302744]"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="h-28 w-full object-cover"
                    />

                    <p className="truncate bg-[#0f0c1c] p-2 text-xs text-[#a9a1bd]">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VIDEOS */}
          {project.category !== "color-grading" && (
            <div className="mt-8 border-t border-[#302744] pt-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="text-lg font-semibold">
                    Videos
                  </h3>

                  <p className="text-sm text-[#a9a1bd]">
                    Each video needs one poster
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addVideo}
                  disabled={project.videos.length >= 10}
                  className="rounded-lg bg-[#a63cff] px-4 py-2 text-sm font-semibold hover:bg-[#922bea] disabled:opacity-40"
                >
                  + Add Video
                </button>

              </div>

              <div className="mt-5 space-y-4">

                {project.videos.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-[#302744] bg-[#100d1d] p-4"
                  >

                    {/* VIDEO HEADER */}
                    <div className="mb-4 flex items-center justify-between">

                      <h4 className="font-semibold">
                        Video {index + 1}
                      </h4>

                      {project.videos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="text-sm text-red-400"
                        >
                          Remove
                        </button>
                      )}

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                      {/* VIDEO */}
                      <label className="flex min-h-[130px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#302744] bg-[#0f0c1c] p-5 text-center hover:border-[#a63cff]">

                        <div>
                          <p className="font-medium">
                            Choose Video
                          </p>

                          <p className="mt-1 text-xs text-[#777087]">
                            MP4, MOV, etc.
                          </p>

                          {item.video && (
                            <p className="mt-2 max-w-[220px] truncate text-xs text-green-400">
                              {item.video.name}
                            </p>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handleVideo(
                              index,
                              "video",
                              e.target.files[0],
                            )
                          }
                          className="hidden"
                        />

                      </label>

                      {/* POSTER */}
                      <label className="flex min-h-[130px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#302744] bg-[#0f0c1c] p-5 text-center hover:border-[#a63cff]">

                        <div>
                          <p className="font-medium">
                            Choose Poster
                          </p>

                          <p className="mt-1 text-xs text-[#777087]">
                            JPG, PNG, WEBP
                          </p>

                          {item.poster && (
                            <p className="mt-2 max-w-[220px] truncate text-xs text-green-400">
                              {item.poster.name}
                            </p>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleVideo(
                              index,
                              "poster",
                              e.target.files[0],
                            )
                          }
                          className="hidden"
                        />

                      </label>

                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* SUBMIT */}
          <div className="mt-8 flex flex-col justify-end gap-3 border-t border-[#302744] pt-6 sm:flex-row">

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="w-full rounded-lg border border-[#302744] px-8 py-3 font-semibold hover:border-[#a63cff] sm:w-auto"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#a63cff] px-8 py-3 font-semibold hover:bg-[#922bea] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading
                ? editId
                  ? "Updating..."
                  : "Creating..."
                : editId
                  ? "Update Project"
                  : "Create Project"}
            </button>

          </div>
        </form>

        {/* EXISTING PROJECTS */}
        <div className="mt-8 rounded-2xl border border-[#302744] bg-[#151124] p-4 sm:p-6">

          <h2 className="text-xl font-semibold">
            Existing Projects
          </h2>

          <p className="mt-1 text-sm text-[#a9a1bd]">
            Projects loaded from backend
          </p>

          <div className="mt-5 space-y-3">

            {projects.length === 0 ? (
              <p className="text-sm text-[#777087]">
                No projects found.
              </p>
            ) : (
              projects.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-[#302744] bg-[#100d1d] p-4"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#a9a1bd]">
                        {item.category}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-[#302744] px-4 py-2 text-sm hover:border-[#a63cff]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminForm;