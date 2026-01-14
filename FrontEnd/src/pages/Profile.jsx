import { useSelector } from "react-redux";
import { useGetMyGigsQuery } from "../redux/slices/api/gigSlice";
import {
  useGetMyBidsQuery,
  useGetBidsReceivedQuery,
} from "../redux/slices/api/bidApiSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: myGigs = [], isLoading: gigsLoading } = useGetMyGigsQuery();
  const { data: myBids = [], isLoading: bidsLoading } = useGetMyBidsQuery();
  const { data: receivedBids = [], isLoading: receivedLoading } =
    useGetBidsReceivedQuery();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  if (gigsLoading || bidsLoading || receivedLoading) {
    return <p className="text-white">Loading profile...</p>;
  }

  /* ===========================
      CLIENT STATS
  =========================== */

  const bidsAcceptedAsClient = receivedBids.filter(
    (bid) => bid.status === "hired"
  );

  const totalAmountCommitted = bidsAcceptedAsClient.reduce(
    (sum, bid) => sum + (bid.price || 0),
    0
  );

  /* ===========================
      FREELANCER STATS
  =========================== */

  const gigsWon = myBids.filter(
    (bid) => bid.status === "hired"
  );

  const totalEarnings = gigsWon.reduce(
    (sum, bid) => sum + (bid.price || 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">
        My Profile
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
          {initial}
        </div>

        <div>
          <p className="text-lg font-medium">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* ================= CLIENT SECTION ================= */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Client Stats
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatCard label="Gigs Created" value={myGigs.length} />
        <StatCard label="Bids Received" value={receivedBids.length} />
        <StatCard label="Bids Accepted" value={bidsAcceptedAsClient.length} />
        <StatCard
          label="Total Amount"
          value={`₹${totalAmountCommitted}`}
          highlight
        />
      </div>

      {/* ================= FREELANCER SECTION ================= */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Freelancer Stats
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard label="Bids Placed" value={myBids.length} />
        <StatCard label="Gigs Won" value={gigsWon.length} />
        <StatCard
          label="Total Earnings"
          value={`₹${totalEarnings}`}
          highlight
        />
      </div>
    </div>
  );
};

/* ===========================
    REUSABLE CARD
=========================== */

const StatCard = ({ label, value, highlight }) => {
  return (
    <div
      className={`rounded-lg p-4 text-center ${
        highlight ? "bg-indigo-50" : "bg-gray-100"
      }`}
    >
      <p
        className={`text-3xl font-bold ${
          highlight ? "text-indigo-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        {label}
      </p>
    </div>
  );
};

export default Profile;
