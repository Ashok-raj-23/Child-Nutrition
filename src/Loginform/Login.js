import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth,provider } from './Firebaseconfig';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const nav = useNavigate()
const [userid,setuserid] = useState({
  mobileno:"",
  pwd:"",
})
   const handlelogin=(e)=>{
    setuserid({...userid ,[e.target.name]:e.target.value})
   } 






   const handlesubmit=(e)=>{
    e.preventDefault()
    console.log(userid);
    axios.post('http://92.205.109.210:8037/api/login',userid)
    .then(res=>{
      console.log(res.data) 
      localStorage.setItem("parentid",JSON.stringify(res.data.data))
      if(res.data.success){
        alert('login successful')
        nav('/home')
      }else{
        alert(res.data.message)
      }  
    })
    .catch((err) => console.error("Signup Error:", err));

   }
   const handlesignup=()=>{
    nav('/signup')
   }
   
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User:", result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
    nav("/home");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
  return (
    <div>Login
      <form onSubmit={handlesubmit}>
      <input type='text' onChange={handlelogin} name='mobileno' value={userid.mobileno} placeholder='Mobile Number'/><br></br>
      <input type='text' onChange={handlelogin} name='pwd' value={userid.pwd} placeholder='Password '/><br></br>
     <button type='submit'> Submit</button>
     <button onClick={handlesignup}>Signup</button>

      </form>
      <button onClick={handleGoogleLogin}>Login With Google</button>

    </div>
  )
}

export default Login