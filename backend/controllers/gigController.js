import Gig from "../models/Gig.js"; 

export const createGig=async(req,res)=>{
    try {
        const {title,description,budget}=req.body; 

        if(!title || !description || !budget){
            return res.status(400).json({
                message:"All fields are required"
            })
        }


        const gig=await Gig.create({
            title,
            description, 
            budget, 
            ownerId:req.user.id,
           
        })

        res.status(201).json(gig)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
} 

// export const getGigs=async(req,res)=>{
//     try {
//         const {search}=req.query 

//         const query={
//             status:"open", 
//             ...(search && {title: {$regex:search,$options:"i"}})
//         }
//         const gigs=await Gig.find(query); 
//         res.json(gigs)
//     } catch (error) {
//         res.status(500).json({error:error.message})
        
//     }
// }

export const getAllGigsExceptMine = async (req, res) => {
  try {
    const { search, status } = req.query;

    const query = {
      ownerId: { $ne: req.user.id }, // 👈 exclude my gigs
    };

    // search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({
      ownerId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
