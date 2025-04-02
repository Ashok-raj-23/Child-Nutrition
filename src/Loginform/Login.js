import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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


  return (
    <div>Login
      <form onSubmit={handlesubmit}>
      <input type='text' onChange={handlelogin} name='mobileno' value={userid.mobileno} placeholder='Mobile Number'/><br></br>
      <input type='text' onChange={handlelogin} name='pwd' value={userid.pwd} placeholder='Password '/><br></br>
     <button type='submit'> Submit</button>
     <button onClick={handlesignup}>Signup</button>

      </form>

    </div>
  )
}

export default Login