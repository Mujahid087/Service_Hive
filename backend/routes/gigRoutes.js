import express from "express" 
import {getAllGigsExceptMine,createGig,getMyGigs, getGigById} from "../controllers/gigController.js"
import { auth } from "../middlewares/authmiddleware.js"
 


const router=express.Router() 
router.get("/my", auth, getMyGigs);
router.get("/",auth,getAllGigsExceptMine) 
router.post("/",auth,createGig) 
router.get("/:id", auth, getGigById);



export default router