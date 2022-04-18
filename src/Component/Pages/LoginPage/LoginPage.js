import React, {useContext, useRef,useState } from 'react';
import './LoginPage.css';



const LoginPage = () =>{

    const emailRef= useRef();
    const passwordOneRef =useRef();
    const passwordTwoRef = useRef();
    const [swapCheck , setSwap] = useState(false);

    const swapHandler =(event) =>{
        event.preventDefault();
        setSwap((preValue)=> !preValue);
    }


 
    const SignupBtnHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordOneRef.current.value;

        //Login
        if(swapCheck){
            if(passwordOneRef.current.value.trim().length > 5 && 
            emailRef.current.value.includes("@") &&
            emailRef.current.value.includes(".com")) {
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
                        emailRef.current.value='';
                        passwordOneRef.current.value='';
                        alert('Login sucessFull');
                      }else{
                        const data = await response.json();
                        alert(data.error.message);
                      }
                }
                catch(err){
                    console('Loging Something went wrong!');
                }
            } else{
                alert('Login Credential Wrong!')
            }   
        } 
        //Signup
         else if(!swapCheck){
         
         if(passwordOneRef.current.value === passwordTwoRef.current.value &&
             passwordOneRef.current.value.trim().length > 5 &&
             emailRef.current.value.includes("@") &&
             emailRef.current.value.includes(".com")
              ){
            
        
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
               emailRef.current.value='';
               passwordOneRef.current.value='';
               passwordTwoRef.current.value='';
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
    }else{
        alert('Please enter field properly');
    }
} 
    }
    const forgotbtnHandler =(event)=>{
        event.preventDefault();
       console.log('reset...')
    }

    return(
        <div  className='backgroundDiv'> 
            <div className='maindivtagg'>
            <form className='mainform' >
                <div>
                    <div>
                        <h1>{swapCheck? 'Login' : 'SignUp' }</h1>
                    </div>
                    <div className='inputFulldiv' >
                        <div className='emaildiv'>
                            <input type="email" htmlFor="email" className='btnclass' placeholder="Email" ref={emailRef}  required/>
                        </div>
                        <div className='emaildiv'>
                            <input type='password'  minLength="6" className='btnclass' ref={passwordOneRef} maxLength="16" placeholder="Password" required/>
                        </div>
                        {!swapCheck && <div className='emaildiv'>
                            <input type='password'   ref={passwordTwoRef} className='btnclass' maxLength="16" placeholder="Confirm Password" minLength="6"  required/>
                        </div>}
                        <div className='emaildiv'>
                            <button onClick={SignupBtnHandler} className='submitbtn' >{swapCheck? 'Login' : 'SignUp'  }</button>
                            {swapCheck && <label className='forgotpassword' onClick={forgotbtnHandler} > Forgot password</label>}
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={swapHandler} className='changebtn'>{swapCheck? "Don't have an account? Sign up" : 'Have an account? Login' }</button>
                </div>
            </form>
        </div>
        </div>
    )
};

export default LoginPage;