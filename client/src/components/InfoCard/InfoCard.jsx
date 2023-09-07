import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js"
import { logout } from "../../actions/AuthAction.js";

const InfoCard = () => {
  const [modalOpened, setModalOpened]= useState(false)

  const dispatch = useDispatch();
  const params = useParams();

  //this fetches the user id from the url
  const profileUserId = params.id;

  //use to update the state of info card
  const [profileUser, setProfileUser] = useState({});

  //used to fetch current user details from the redux store
  const {user} = useSelector((state)=>state.authReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log(user)
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);// the ,[user] is second parameter of useEffect func
  //which act as dependency that when user is changed only then 
  // the effects Re-render otherwise it would render the infoCard infinite 
  //times

  const handleLogOut = () =>{
    //cause of error was logout() was written like logout
    dispatch(logout())
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id===profileUserId ? (<div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened ={setModalOpened}
            data = {user}
          />
        </div>) : ("")
        }
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default InfoCard;
