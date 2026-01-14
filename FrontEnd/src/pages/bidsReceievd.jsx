import { useGetBidsReceivedQuery, useHireBidMutation } 
from "../redux/slices/api/bidApiSlice";

const BidsReceived = () => {
  const { data: bids = [], isLoading } = useGetBidsReceivedQuery();
  const [hireBid] = useHireBidMutation();

  if (isLoading) {
    return <p className="text-white">Loading bids...</p>;
  }

  // 🔥 HIDE REJECTED BIDS
  const visibleBids = bids.filter(
    (bid) => bid.status !== "rejected"
  );

  if (visibleBids.length === 0) {
    return <p className="text-gray-300">No bids received yet.</p>;
  }

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Bids Received
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleBids.map((bid) => (
          <div
            key={bid._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {/* Gig Info */}
            <div>
              <h3 className="font-semibold text-gray-900 truncate">
                {bid.gigId.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                From: {bid.freelancerId.name}
              </p>

              <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                {bid.message}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-indigo-600">
                ₹{bid.price}
              </span>

              {bid.status === "pending" ? (
                <button
                  onClick={() => hireBid(bid._id)}
                  className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700"
                >
                  Hire
                </button>
              ) : (
                <span
                  className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700"
                >
                  Hired
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidsReceived;
