import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



function Home() {
    const [child,setchild] = useState({  
       name: "",
       age: "",
       gender: "",
       weight: "",
       height:"",
       bmi: "",
       userid:"",
        })
     const [children,setchildren] = useState([])
     const [addchild,setaddchild]= useState(false)
     const [edit , setedit] = useState(false)
     const [editchild ,seteditchild] = useState(null) 
     const [report , setreport] = useState([])
     let nav = useNavigate()
     let parent = localStorage.getItem("parentId");
     let parentId = JSON.parse(parent)
     console.log(parentId);
     let childId = {...child,userid:parentId._id}

 
    
        const handlechange=(e)=>{
          e.preventDefault();
          setchild({...child,[e.target.name]:e.target.value})
        }
      

    const handlenewchild=()=>{
     setaddchild(!addchild);
     setedit(false);
    
    }

      useEffect(()=>{
        if (!child || !child.weight || !child.height) return;
        const weight = parseFloat(child.weight)
        const height = parseFloat(child.height)/100;
        if(weight>0 && height>0){
          setchild(child=>({...child, bmi:(weight/(height * height)).toFixed(2)}))
        }else{
          setchild(child=>({...child,bmi:""}))
        }

      },[child?.weight,child?.height])

    
      
      
      
    function handlesubmit(e){
      e.preventDefault()

   
      if(edit){
        axios.post('http://92.205.109.210:8037/api/updatebyidchild',{id:editchild,...childId})
        .then(res=>{
            console.log("Updating Child ID:",editchild);
            setedit(false);
            setaddchild(false)
            setchild(res.data.data)
           
        })

      }else{
        axios.post('http://92.205.109.210:8037/api/createchild',childId)
        .then(res=>{
        console.log("Created...",res.data)
        setchildren([...children, res.data.data]);

        setaddchild(true);
        setchild(res.data.data)
        })
       .catch(err => console.error("API Error:", err));
      }

      
  } 
     function handleAllchild(){
      axios.post('http://92.205.109.210:8037/api/getchild',{id : parentid._id})
       .then(res=>{
        console.log("All ChildID... :" ,res.data); 
        setchildren(res.data.data);
       })
       .catch(err => console.error("Error child data:", err));

      }

      useEffect(()=>{
        handleAllchild()
      },[])

const handleEdit=(child)=>{
setchild(child);
seteditchild(child._id)
setedit(true);
setaddchild(true)
}


function newtrientschild(childData){
  
  console.log(childData);
  
  axios.post('http://92.205.109.210:8037/report/getall',{Age: childData.age,Gender:childData.gender,
    bmiRange:childData.bmi

  })
  .then(res=>{
    console.log(res.data);
    let list = res.data.data
    console.log(list);
    

    if (list[0]) {
      Swal.fire({
        title: "Nutrition list",
        html: `
          <div style="border-radius: 10px; padding: 15px; background: #f8f9fa; text-align: left;">
            <h3 style="color: #007bff;">Nutrition Information</h3>
            <p><strong>BMICategory:</strong> ${list[0].BMICategory || "N/A"}</p>
         
            <p><strong>Protein:</strong> ${list[0].Protein || "N/A"}g</p>
            <p><strong>Carbs:</strong> ${list[0].Carbohydrates || "N/A"}g</p>
            <p><strong>Fiber:</strong> ${list[0].Fiber || "N/A"}g</p>
            <p><strong>Fat:</strong> ${list[0].Fat || "N/A"}g</p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Sweetart data not found!",
        icon: "error",
      });
    }
  })
}





function handleNutrition(childData){
  axios.post('http://92.205.109.210:8037/report/getall',{Age: childData.age,Gender:childData.gender,
    bmiRange:childData.bmi

  })
  .then(res=>{
    console.log(res.data);
    let list = res.data.data
    console.log(list);
    let childId = child._id
    let childNutrition= {
      childId:child._id,
      ...list
    }
 
  nav('/food',{state:childNutrition})
})

}

  return (
    <div>
         
   
<button  onClick={handlenewchild}>{addchild ? 'Close ':'Add Child'}</button>
{addchild && (
<form onSubmit={handlesubmit}>
<h1>Child Details</h1>
     <input type='text' onChange={handlechange} name='name' value={child.name} placeholder='Child Name '/><br></br>
      <input type='number' onChange={handlechange} name='age' value={child.age} placeholder='Age '/><br></br>

      <select name="gender" value={child.gender} onChange={handlechange}>
      <option value="gender">Gender</option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>

      </select><br></br>
      <input type='text' onChange={handlechange} name='weight' value={child.weight} placeholder='Weight'/><br></br>
      <input type='text' onChange={handlechange} name='height' value={child.height} placeholder='Height'/><br></br> 
     <input type='text' name='bmi' value={child.bmi} placeholder='BMI (Auto-Calculated)' readOnly/><br></br>

     <button type='submit'>{edit ? 'Update' : 'Submit'}</button>
      </form>
      )}
<div className="mt-4">
                    {children.map((child, index) => (
                        <Card key={index} className="mt-3" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Child Name: {child.name}</Card.Title>
                                <Card.Text>
                                    <p>Age: {child.age}</p>
                                    <p>Gender: {child.gender}</p>
                                    <p>Weight: {child.weight}</p>
                                    <p>Height: {child.height}</p>
                                    <p>BMI: {child.bmi}</p>
                                </Card.Text>
                                <Button variant="primary" onClick={()=>handleEdit(child)}>Edit</Button>
                                <Button onClick={()=>newtrientschild(child)}>Foodlists</Button>
                                <Button onClick={()=>handleNutrition(child)}>Add Nutrition</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
    </div>
  )
}

export default Home