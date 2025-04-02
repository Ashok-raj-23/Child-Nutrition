import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth,provider } from './Firebaseconfig';



function Signup() {
  const nav=useNavigate()
 const [userid,setuserid] = useState({
     parentsname:"",
    mobileno:"",
    pwd:"",
    createdBy:""
    
 })
//  const [password,setpassword] = useState()


 
const handlechange=(e)=>{
   setuserid({...userid,[e.target.name]:e.target.value})
}
 const handlesubmit=(e)=>{
  e.preventDefault();
    console.log("Submitted Data:", userid);
    let user ={
      parentsname:userid.parentsname,
      pwd:userid.pwd,
      mobileno:userid.mobileno,
      createdBy:userid.parentsname
    }
    axios.post("http://92.205.109.210:8037/api/signup", user)
    .then((res) => {
      console.log("Signup Successful:", res.data);
    })
    .catch((err) => console.error("Signup Error:", err));

    Swal.fire({
      title: " Signin successful!",
      icon: "success",
      draggable: true,
      
    });
    nav('/')

}
 
const handleGooglesignin = async ()=>{
  try{
    const result = await signInWithPopup(auth,provider)
    console.log("user:", result.user);
    nav('/Home')
  }catch(error){
    console.error("Error Signing in :",error)
  }

};


  return (
    <div>Signup
      <form onSubmit={handlesubmit}>
              <div>
              <input type='text' onChange={handlechange} name='parentsname' value={userid.parentsname} placeholder='Parents Name'/>

              </div>
              <div>
              <input type='text' onChange={handlechange} name='pwd' value={userid.pwd} placeholder='password'/>

              </div>
              <div>
              <input type='number' onChange={handlechange} name='mobileno' value={userid.mobileno} placeholder='Mobile Number'/>

              </div>
              {/* <div>
              <input type='text' onChange={handlechange} name='createdBy' value={userid.createdBy} placeholder='CreatedBy'/>

              </div> */}

              <button type='submit'>Submit</button>
              
              </form>
              <button onClick={handleGooglesignin}>Signin With Google</button>
    </div>
  )
}

export default Signup