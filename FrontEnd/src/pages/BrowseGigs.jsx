import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrowseGigsQuery } from "../redux/slices/api/gigSlice";

const BrowseGigs = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data: gigs = [], isLoading } = useBrowseGigsQuery({
    search,
    status,
  });

  if (isLoading) {
    return <p className="text-white">Loading gigs...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">
        Browse Gigs
      </h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-1/2
            bg-white
            text-gray-900
            placeholder-gray-500
            px-4 py-2
            rounded-lg
            shadow
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full sm:w-48
            bg-white
            text-gray-900
            px-4 py-2
            rounded-lg
            shadow
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
        </select>
      </div>

      {/* 🧾 Gigs List */}
      {gigs.length === 0 ? (
        <p className="text-gray-300">
          No gigs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              onClick={() => navigate(`/gigs/${gig._id}`)}
              className="
                bg-white
                rounded-lg
                shadow
                p-5
                cursor-pointer
                hover:shadow-lg
                transition
              "
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {gig.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {gig.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-indigo-600">
                  ₹{gig.budget}
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    gig.status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {gig.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BrowseGigs;
