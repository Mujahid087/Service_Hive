import { useParams, useNavigate } from "react-router-dom";
import { useGetGigByIdQuery } from "../redux/slices/api/gigSlice";
import { useCreateBidMutation } from "../redux/slices/api/bidApiSlice";
import { useState } from "react";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: gig, isLoading } = useGetGigByIdQuery(id);
  const [createBid, { isLoading: bidding }] = useCreateBidMutation();

  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  if (isLoading) {
    return <p className="text-white">Loading gig details...</p>;
  }

  if (!gig) {
    return <p className="text-white">Gig not found</p>;
  }

  const submitBid = async () => {
    try {
      await createBid({
        gigId: gig._id,
        price,
        message,
      }).unwrap();

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-indigo-600 mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">
        {gig.title}
      </h1>

      <p className="text-gray-700 mb-4">
        {gig.description}
      </p>

      <div className="flex justify-between mb-6">
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

      {/* 🚫 ASSIGNED NOTICE */}
      {gig.status !== "open" && (
        <div className="mb-6 rounded-md bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-sm text-yellow-800 font-medium">
            This gig has already been assigned and is no longer accepting bids.
          </p>
        </div>
      )}

      <hr className="mb-6" />

      {/* BID FORM */}
      <h2 className="text-xl font-semibold mb-4">
        Place a Bid
      </h2>

      <textarea
        placeholder="Write your proposal..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={gig.status !== "open"}
        className="w-full border rounded p-3 mb-4 disabled:bg-gray-100"
      />

      <input
        type="number"
        placeholder="Your bid amount"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={gig.status !== "open"}
        className="w-full border rounded p-3 mb-4 disabled:bg-gray-100"
      />

      <button
        onClick={submitBid}
        disabled={bidding || gig.status !== "open"}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        Submit Bid
      </button>
    </div>
  );
};

export default GigDetails;
