import { useGetMyGigsQuery } from "../redux/slices/api/gigSlice";

const MyGigs = () => {
  const { data: gigs, isLoading } = useGetMyGigsQuery();

  if (isLoading) {
    return <p className="text-white">Loading your gigs...</p>;
  }

  if (!gigs || gigs.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-xl font-semibold">No gigs created yet</h2>
        <p className="text-gray-300 mt-2">
          Create your first gig to start receiving bids.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">
        My Gigs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-white rounded-lg shadow p-5 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {gig.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2 flex-grow">
              {gig.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
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
    </>
  );
};

export default MyGigs;
