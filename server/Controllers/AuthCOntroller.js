import UserModel  from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Resgistering a new User
export const registerUser = async(req, res) => {

    // const {username, password, firstname, lastname} = req.body;


    const salt = await bcrypt.genSalt(10) //this generate the Hash function
    const hashedPass = await bcrypt.hash(req.body.password, salt)// generate hashed password
    req.body.password = hashedPass
    // const newUser = new UserModel({username, 
    //     password: hashedPass, 
    //     firstname, 
    //     lastname})

    const newUser = new UserModel(req.body)
    const {username} = req.body

    try{
        const oldUser = await UserModel.findOne({username})

        if(oldUser)
        {
            return res.status(400).json({message:"the username is already registered"})
        }
        //after saving a new user it would return the json of the saved user
        const user = await newUser.save()

        // token - header.payload.signature
        //sign function creates the token using payload,secret key,and gives an expiry date 
        //to token
        const token = jwt.sign({
            username: user.username,
            id: user._id
        },process.env.JWT_KEY,{expiresIn: '1h'})
        res.status(200).json({user,token})
    } catch (error){
        res.status(500).json({message: error.message})

    }

}

// login User

export const loginUser = async (req, res)=>{
    const {username, password} = req.body

    try{
        const user = await UserModel.findOne({username:username})

        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)

            // validity? res.status(200).json(user): res.status(400).json("Wrong Password")
            if(!validity){
                res.status(400).json("Wrong Password")
            }
            else//create token 
            {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id
                },process.env.JWT_KEY,{expiresIn: '1h'})
                res.status(200).json({user,token})
            }
        }
        else{
            res.status(404).json("User Doesn't Exist")
        }
    } catch (error) {
        res.status(500).json({message: error.message})

    }

}