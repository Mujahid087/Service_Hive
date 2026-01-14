// import mongoose from "mongoose";
// import Bid from "../models/Bid.js";
// import Gig from "../models/Gig.js";

// export const hireBid = async (req, res) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const bid = await Bid.findById(req.params.bidId).session(session);
//     if (!bid) throw new Error("Bid not found");

//     const gig = await Gig.findById(bid.gigId).session(session);
//     if (!gig) throw new Error("Gig not found");

//     //  Authorization check
//     if (gig.ownerId.toString() !== req.user.id) {
//       throw new Error("Unauthorized");
//     }

//     //  Prevent double hiring
//     if (gig.status === "assigned") {
//       throw new Error("Gig already assigned");
//     }

//     // Assign gig
//     gig.status = "assigned";
//     await gig.save({ session });

//     // Hire selected bid
//     bid.status = "hired";
//     await bid.save({ session });

//     // Reject other bids
//     await Bid.updateMany(
//       { gigId: gig._id, _id: { $ne: bid._id } },
//       { status: "rejected" },
//       { session }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     res.json({ message: "Freelancer hired successfully" });
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(400).json({ error: err.message });
//   }
// };

import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { io, getSocketIdByUserId } from "../server.js";

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) throw new Error("Gig not found");

    // 🔐 Authorization check
    if (gig.ownerId.toString() !== req.user.id) {
      throw new Error("Unauthorized");
    }

    // 🚫 Prevent double hiring (race condition safety)
    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    // ✅ Assign gig
    gig.status = "assigned";
    await gig.save({ session });

    // ✅ Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // ❌ Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    // ✅ Commit transaction FIRST
    await session.commitTransaction();
    session.endSession();

    /* ===========================
       🔔 SOCKET NOTIFICATION
    =========================== */
    const freelancerSocketId = getSocketIdByUserId(
      bid.freelancerId.toString()
    );

    if (freelancerSocketId) {
      io.to(freelancerSocketId).emit("hired", {
        gigTitle: gig.title,
        gigId: gig._id,
      });
    }

    res.json({ message: "Freelancer hired successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};
