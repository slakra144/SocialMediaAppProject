import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


//get all users
export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find();
        //find the first 20 document from database

        //seperate the password field and return rest of the values
        //this is important
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails;
        })
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error)
    }
}



//get a User

export const getUser = async (req,res)=>{
    const id =req.params.id;

    try {
        const user = await UserModel.findById(id);
        if(user)
        {
            const {password, ...otherDetails} = user._doc;//it removes the password field when returning the response
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("No such user exist")
        }
    } catch (error) {
        res.status(500).json(error);
        
    }
    
}

//update a User
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password} =req.body
    //          |
    //      current user 
    // who called this function

    if (id == _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true }) //{new: true} return the modified document rather than the original

            const token = jwt.sign(
                {
                    username: user.username, id: user._id
                },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            )
            res.status(200).json({user,token});

        } catch (error) {

            res.status(500).json(error);

        }
    }
    else {
        res.status(403).json("Access Denied! you can only update your own profile")
    }
}

//delete a User
export const deleteUser = async (req,res)=>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId===id || currentUserAdminStatus)
    {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("user deleted successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Access Denied! you can only delete your own profile")
    }
}

//follow a user
export const followUser =async (req,res)=>{
    const id =req.params.id//the id of user we want to follow
    //we get this id from url as localhost:5000/user/64bdfcdaea319a0b720df687
    //                                               :id
    //                                                        |
    //                                               it return this part

    const {_id}=req.body//the user who wants to follow and clicked the follow button
    if(_id===id)//a user cannot follow itself
    {
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const tofollowUser = await  UserModel.findById(id) //must to add await
            const followingUser = await UserModel.findById(_id)

            if(!tofollowUser.followers.includes(_id))//remeber it is includes
            {
                await tofollowUser.updateOne({$push : {followers: _id}})//updateOne parameter important this calls the
                // push command to push the given currentId inside the followers array
                await followingUser.updateOne({$push : {following: id}})
                res.status(200).json("user folllowed")

            }
            else
            {
                res.status(403).json("USer is already followed by you")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

//unfollow a user
export const unFollowUser =async (req,res)=>{
    const id =req.params.id//the id of user we want to unfollow
    //we get this id from url as localhost:5000/user/64bdfcdaea319a0b720df687
    //                                               :id
    //                                                        |
    //                                               it return this part

    const {_id}=req.body//the user who wants to unfollow and clicked the follow button again
    if(_id===id)//a user cannot unfollow itself
    {
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const tofollowUser = await  UserModel.findById(id) //must to add await
            const followingUser = await UserModel.findById(_id)

            if(tofollowUser.followers.includes(_id))//remeber it is includes
            {
                await tofollowUser.updateOne({$pull : {followers: _id}})//updateOne parameter important this calls the
                // pull command to removes the given currentId inside the followers array
                await followingUser.updateOne({$pull : {following: id}})
                res.status(200).json("user Unfolllowed")

            }
            else
            {
                res.status(403).json("USer is not followed by you")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
