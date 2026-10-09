import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================
    // Send OTP
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong"
                );
            }

            setMessage(
                data.message || "OTP sent to your email"
            );

            setOtpSent(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Verify OTP
    // =========================
    const handleVerifyOTP = async () => {
        console.log("VERIFY BUTTON CLICKED");

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/verify-reset-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid OTP"
                );
            }

            setMessage(
                data.message || "OTP verified successfully"
            );

            // OTP verified
            setVerified(true);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Reset Password
    // =========================
    const handleResetPassword = async () => {
        setError("");
        setMessage("");

        if (!newPassword || !confirmPassword) {
            setError("Please enter both passwords");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                        newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to reset password"
                );
            }

            setMessage(
                data.message || "Password reset successfully"
            );

            // Clear password fields
            setNewPassword("");
            setConfirmPassword("");

            // Go back to login after a short delay
            setTimeout(() => {
                navigate("/admin/login");
            }, 1500);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0b0817] px-4">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">

                {/* =========================
                    Heading
                ========================= */}
                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-white">
                        Forgot Password
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Enter your admin email to receive an OTP
                    </p>

                </div>


                {/* =========================
                    Error Message
                ========================= */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}


                {/* =========================
                    Success Message
                ========================= */}
                {message && (
                    <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        {message}
                    </div>
                )}


                {/* =========================
                    Form
                ========================= */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* =========================
                        Email
                    ========================= */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                            required
                        />

                    </div>


                    {/* =========================
                        OTP
                    ========================= */}
                    {otpSent && !verified && (
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => {

                                    const value =
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );

                                    setOtp(value);
                                }}
                                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                            />

                        </div>
                    )}


                    {/* =========================
                        New Password
                    ========================= */}
                    {verified && (
                        <div className="space-y-5">

                            {/* New Password */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                                />

                            </div>


                            {/* Confirm Password */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
                                />

                            </div>


                            {/* Reset Password */}
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                disabled={loading}
                                className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Resetting Password..."
                                    : "Reset Password"}
                            </button>

                        </div>
                    )}


                    {/* =========================
                        Send OTP Button
                    ========================= */}
                    {!verified && !otpSent && (
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"}
                        </button>
                    )}


                    {/* =========================
                        Verify OTP Button
                    ========================= */}
                    {!verified && otpSent && (
                        <button
                            type="button"
                            onClick={handleVerifyOTP}
                            disabled={
                                loading ||
                                otp.length !== 6
                            }
                            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Verifying OTP..."
                                : "Verify OTP"}
                        </button>
                    )}


                    {/* =========================
                        Back to Login
                    ========================= */}
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/login")
                        }
                        className="w-full text-sm text-purple-400 hover:text-purple-300"
                    >
                        ← Back to Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ForgotPassword;