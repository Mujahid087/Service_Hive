import express from "express"
import {createBid,getBidByGigs, getMyBids,getBidsReceived} from "../controllers/bidController.js"
import {hireBid} from "../controllers/hiringController.js" 

import { auth } from "../middlewares/authmiddleware.js"


const router=express.Router()

router.get("/received", auth, getBidsReceived);
router.post("/",auth,createBid)
router.get("/my",auth,getMyBids)
router.get("/:gigId",auth,getBidByGigs) 
router.patch("/:bidId/hire",auth,hireBid)  


export default router