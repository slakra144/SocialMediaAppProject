import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'//new concept
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {

  const dispatch =useDispatch()//used to send actions to reducers
  const loading= useSelector((state)=>state.authReducer.loading)

  //switches b/w login and signUp
  const [isSignUp, setIsSignUp] = useState(true)
  console.log(loading)

  //this is used to create form which store the input data in login and signUp
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })

  //to check is the password matches the confirm password
  //and display error according to current state of confirmPass
  const [confirmPass, setConfirmPass] = useState(true)

  //reflect change in input to the use state Hook
  //... is used to destucture the previous data
  // and also add the new data via e.target
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  

  //on clicking the submit button 
  // check is the pass = confirmpass
  const handleSubmit = (e) => {
    //prevent stop redirecting to previous page
    e.preventDefault();

    if (isSignUp)
    // signUp and LogIn are the actions
    {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    }
    else {
      dispatch(logIn(data))
    }
  }

  //clear remove the not equal password text
  //clear the state of data when switching from login to pass
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: ""
    })
  }
  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>


      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>


          {isSignUp &&
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                // this keeps the value int the form according to current 
                // use state of data 
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>}


          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data.confirmpass}
            />}

          </div>

          {/* display prop if value is none then element not displayed */}
          <span style={{
            display: confirmPass ? "none" : "block", color: 'red',
            fontSize: '12px', alignSelf: "flex-end", marginRight: '5px'
          }}>
            * Confirm Password is not same
          </span>
          <div>
            <span style={{ fontSize: "12px", cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>
              {/* setIsSignUp((prev)=>!prev) this changes the state of screen from log In to Sign Up and vice versa */}
              {isSignUp ? "Already have an account. Login!" : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading?"Loading.." :isSignUp ? "Signup" : "Log In"}
            {/* this loading?"Loading.." would check the global state object variable loading  */}
          </button>
        </form>
      </div>


      {/* <Signup/> */}
    </div>
  );
};

export default Auth;
