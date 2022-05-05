import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [swapCheck, setSwap] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .max(255)
        .min(6, "Minimum 6 charater")
        .required("Password is required"),
        confirmpassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: async(values) => {
      console.log(values);
      const enteredEmail = values.email;
      const enteredPassword = values.password;

      //Login
      if(swapCheck){
        
            try{
                const response =  await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcp2QFFnFM8y6S7A_OTDQlJR65FQoNujA",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  if(response.ok){
                    const data = await response.json();
                    localStorage.setItem('JWTTOKEN',data.idToken);
                    localStorage.setItem('userID',data.localId);
                    localStorage.setItem('Email',data.email);
                    alert('Login sucessFull');
                    history.replace('/welcome');
                    dispatch(authActions.setAuth(true))
                  }else{
                    const data = await response.json();
                    alert(data.error.message);
                  }
            }
            catch(err){
                console('Loging Something went wrong!');
            }
        
    }
    //Signup
     else if(!swapCheck){
    try{
        const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcp2QFFnFM8y6S7A_OTDQlJR65FQoNujA",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
       )
       if(response.ok){
           console.log('User has successfully signed up.');
           setSwap(true);
           alert('Account created, Please Login.');
       }else{
        const data = await response.json();
        alert(data.error.message);
       }
    }catch(err){
        console.log('Something went wrong')
        console.log(err);

    }
}  
    },
  });

  const swapHandler = (event) => {
    event.preventDefault();
    setSwap((preValue) => !preValue);
  };

  // const forgotbtnHandler =(event)=>{
  //     event.preventDefault();
  //    console.log('reset...')
  // }
  
  
  return (
    <div className="backgroundDiv">
      <div className="maindivtagg">
        <form className="mainform">
          <div>
            <div>
              <h1>{swapCheck ? "Login" : "SignUp"}</h1>
            </div>
            <div className="inputFulldiv">
              <div className="emaildiv">
                <input
                  type="email"
                  name="email"
                  className="btnclass"
                  value={formik.values.email}
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p style={{ color: "red" }}> {formik.errors.email}</p>
              )}
              <div className="emaildiv">
                <input
                  type="password"
                  name="password"
                  className="btnclass"
                  value={formik.values.password}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div>
                {formik.touched.password && formik.errors.password && (
                  <p style={{ color: "red" }}> {formik.errors.password}</p>
                )}
              </div>
              {!swapCheck && (
                  <div className="emaildiv">
                  <input
                    type="password"
                    name="confirmpassword"
                    className="btnclass"
                    value={formik.values.confirmpassword}
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </div>
              )}
              
              <div className="emaildiv">
                <button onClick={formik.handleSubmit} className="submitbtn">
                  {swapCheck ? "Login" : "SignUp"}
                </button>
                {swapCheck && (
                  <label className="forgotpassword"> Forgot password</label>
                )}
              </div>
            </div>
          </div>
          <div>
            <button onClick={swapHandler} className="changebtn">
              {swapCheck
                ? "Don't have an account? Sign up"
                : "Have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
