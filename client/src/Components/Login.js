import React from 'react'
import {useState} from "react";


function Login({user,setUser}) {
     const formValues = {
          email : "",
          password : "",  
     }
     const [values, setValues] = useState(formValues);
     const [errors,setErrors] = useState(null);

     function handleInputChange(event) {
          const name = event.target.name;
          const value = event.target.value;

          setValues({
               ...values,
               [name]: value,
          }
          )
     }

     function formSubmission(e) {
          e.preventDefault();
          console.log(values);
          debugger;
          fetch("/sessions", {
               method: 'POST',
               body: JSON.stringify(values)
          })
          .then((r) => {
               if (r.ok) {
                    r.json().then((user)=> setUser(user));
               } else {
                    r.json().then((error)=> setErrors(error));
               }
          });
          setValues(formValues);
     }

     return (
          <div className="signup-login-form">
               <div id="email-pass-input">
                    <h1 className="signup-login-header">Log in to Easy Boards</h1>
                    <form action="submit" onSubmit={(e)=> formSubmission(e)}>
                         <input type="text" name="email" onChange={(event)=> handleInputChange(event)}className="form"placeholder="Enter email" value={values.email}/>
                         <input type="password" name="password" onChange={(event)=> handleInputChange(event)}className="form"placeholder="Enter password" value={values.password}/>
                         <input type="submit" className="active-login-signup-button" value="Login"/>
                    </form>
               </div>
          </div>
     )
}

export default Login