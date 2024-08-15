import userModel from "../models/userModel.js";
// to create authentication
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({success:false,message:'user does not exist'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({success:false,message:'invalid credentials'})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:`error-> ${error}`})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

// register user
const registerUser = async (req, res) => {
    const {name,password,email}=req.body

    try {
        
        // validating email and password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Enter a valid email"})
        }
        if (password.length<8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }
        
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({success:false,message:'User already exists'})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new userModel({ name: name, email: email, password: hashedPassword })
        
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})
        

    } catch (error) {
        console.log(error)
        res.json({success:false,message:`Error ${error}`})
    }
}



export {loginUser,registerUser}