
import User from "../models/User";
import bcrypt from "bcrypt";
import express, { Request, Response, } from "express";


const router = express.Router();




//registration route

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    console.log("POST /api/auth/register called");
    try{
        const { email, password} = req.body;
        // check if the user already exists
        const isExistingUser = await User.findOne({email});

    if(isExistingUser) {
        res.status(400).json({success : false, message : "User already exists"});
        

        //hash password
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //create a new user
    const newUser = new User({
        email,
        password : hashPassword,
    });
    await newUser.save();


    res.status(201).json({success : true, message : "User created successfully"})
        

    }catch(e) {
        console.log(e);
         res.status(500).json({success : false, message : "Internal server error! try again later"})
         return;
    }
    });

    export default router;
    
