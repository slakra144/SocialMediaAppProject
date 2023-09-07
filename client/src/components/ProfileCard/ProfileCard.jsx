import React from 'react'
// import Cover from '../../img/cover.jpg'
// import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
const  ProfileCard = ({location}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    //uncomment the posts selector once merged in g
    // const posts = useSelector((state)=>state.postReducer.post)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='ProfileCard'>

            <div className="ProfileImages">
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
                <img src={ user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"} alt="" />
              {/* for profile picture it should be user.profilePicture not user.coverPicture */}
            </div>

            <div className="ProfileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>
                            {user.following.length}
                        </span>
                        <span>Followings</span>
                    </div>

                    <div className="vl"></div>

                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                {location==='profilePage' && (
                    <>
                    <div className="vl"></div>
                    <div className="follow">
                        {/* <span>{posts.filter((posts)=>posts.userID===user._id).length}</span> */}
                        <span>3</span>
                        <span>Post</span>
                    </div>
                    </>
                )}
                </div>
                <hr />
            </div>

            {/* <span>
                My Profile
        </span> */}
        {location==='profilePage' ? ("") : (
        <span>
            <Link style={{textDecoration:"none", color: "inherit"}} to={`/profile/${user._id}`}>
            My Profile
            </Link>
        </span>)}

        </div>


    )
}

export default ProfileCard