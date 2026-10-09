import { useEffect, useState } from "react";

const Leads = () => {
  // MongoDB ton aun wala data
  const [leads, setLeads] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // ===============================
  // Fetch Leads
  // ===============================
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      // Backend API ton leads fetch
const token = sessionStorage.getItem("adminToken")

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      // Response nu JSON vich convert karo
      const data = await response.json();

      // Je backend error response deve
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch leads"
        );
      }

      // Backend response vich array da naam "contact" aa
      setLeads(data.contact || []);

    } catch (error) {
      console.error(
        "Fetch leads error:",
        error
      );

      // Error screen te show karo
      setError(
        error.message || "Unable to load leads."
      );
    } finally {
      // Loading complete
      setLoading(false);
    }
  };

  // ===============================
  // Page Load
  // ===============================
  useEffect(() => {
    fetchLeads();
  }, []);

  // ===============================
  // Loading UI
  // ===============================
  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading leads...
      </div>
    );
  }

  // ===============================
  // Error UI
  // ===============================
  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  // ===============================
  // Main UI
  // ===============================
  return (
    <div className="min-h-screen bg-[#080714] p-6 text-white">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <p className="mt-2 text-gray-400">
          Manage all contact form enquiries.
        </p>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">

        <table className="w-full min-w-[800px]">

          {/* Table Header */}
          <thead className="border-b border-white/10 bg-white/5">
            <tr>

              <th className="px-5 py-4 text-left text-sm text-gray-400">
                Name
              </th>

              <th className="px-5 py-4 text-left text-sm text-gray-400">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-sm text-gray-400">
                Subject
              </th>

              <th className="px-5 py-4 text-left text-sm text-gray-400">
                Message
              </th>

              <th className="px-5 py-4 text-left text-sm text-gray-400">
                Date
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {/* Je koi lead nahi */}
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No leads found.
                </td>
              </tr>
            ) : (

              /* Leads render */
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-white/10 transition hover:bg-white/5"
                >

                  {/* Name */}
                  <td className="px-5 py-4 font-medium">
                    {lead.name}
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-gray-300">
                    {lead.phone}
                  </td>

                  {/* Subject */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                      {lead.subject}
                    </span>
                  </td>

                  {/* Message */}
                  <td className="max-w-xs px-5 py-4 text-gray-400">
                    {lead.message}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Leads;