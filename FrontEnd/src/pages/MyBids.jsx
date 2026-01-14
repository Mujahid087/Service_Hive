import { useGetMyBidsQuery } from "../redux/slices/api/bidApiSlice";

const MyBids = () => {
  const { data: bids = [], isLoading } = useGetMyBidsQuery();

  if (isLoading) {
    return <p className="text-white">Loading your bids...</p>;
  }

  if (bids.length === 0) {
    return (
      <p className="text-gray-300 text-center mt-10">
        You haven’t placed any bids yet.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">
        My Bids
      </h1>

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {bid.gigId.title}
              </h3>
              <p className="text-sm text-gray-600">
                {bid.message}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-indigo-600">
                ₹{bid.price}
              </p>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  bid.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : bid.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bid.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBids;
