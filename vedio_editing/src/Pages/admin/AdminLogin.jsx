import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // JWT token save
            sessionStorage.setItem("adminToken", data.token);
            // Admin dashboard te redirect
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0817] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md border border-white/10">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Login to access your admin dashboard
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* forget  */}
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/forgot-password")}
                            className="text-sm text-purple-400 transition hover:text-purple-300"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;