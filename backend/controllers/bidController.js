import Bid from "../models/Bid.js"
import Gig from "../models/Gig.js"
 

export const createBid=async (req,res)=>{
    try {
        const {gigId,message,price}=req.body; 

        const gig=await Gig.findById(gigId); 

        if(!gig || gig.status!=="open"){
            return res.status(400).json({
                message:"Gig not open"
            })
        }

        const bid=await Bid.create({
            gigId, 
            freelancerId:req.user.id, 
            message, 
            price
        })

        res.status(201).json(bid)



    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

}

export const getBidByGigs = async (req, res) => {
  try {
    const { gigId } = req.params; // ✅ FIXED

    if (!gigId) {
      return res.status(400).json({ message: "gigId is required" });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // 🔐 Only gig owner can view bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const bids = await Bid.find({ gigId: gig._id });

    res.status(200).json(bids); // ✅ FIXED
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      freelancerId: req.user.id,
    })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

export const getBidsReceived = async (req, res) => {
  try {
    // find gigs owned by me
    const myGigs = await Gig.find({ ownerId: req.user.id }).select("_id");

    const gigIds = myGigs.map(g => g._id);

    const bids = await Bid.find({
      gigId: { $in: gigIds }
    })
      .populate("gigId", "title status budget")
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};