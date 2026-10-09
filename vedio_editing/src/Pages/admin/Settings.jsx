import { useEffect, useState } from "react";

const Settings = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // ===============================
    // Fetch Current Admin
    // ===============================
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const token = sessionStorage.getItem("adminToken");

                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(data.message);
                    return;
                }

                setFormData((prev) => ({
                    ...prev,
                    username: data.admin.username,
                    email: data.admin.email,
                }));
            } catch (error) {
                console.error("Fetch admin error:", error);
            }
        };

        fetchAdmin();
    }, []);

    // ===============================
    // Handle Input Change
    // ===============================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ===============================
    // Update Admin Settings
    // ===============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check new password
        if (
            formData.newPassword &&
            formData.newPassword !== formData.confirmPassword
        ) {
            alert("New passwords do not match");
            return;
        }

        try {
            const token = sessionStorage.getItem("adminToken");

            const response = await fetch(
                "http://localhost:5000/api/auth/update",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Unable to update settings");
                return;
            }

            alert("Settings updated successfully");

            setFormData({
                username: data.admin.username,
                email: data.admin.email,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("Settings update error:", error);
            alert("Server error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-6 text-white sm:p-8">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        Settings
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Manage your admin account and security settings.
                    </p>
                </div>

                {/* Account Settings */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                    <h2 className="text-xl font-medium">
                        Account Settings
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Update your username and email address.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-5"
                    >

                        {/* Username */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                            />
                        </div>

                        {/* Current Password */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-600"
                            />
                        </div>

                        {/* Button */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;