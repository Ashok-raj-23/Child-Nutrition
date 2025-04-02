import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function Profile() {
    const nav=useNavigate()
    const [childby,setchildby] = useState([])

    let newchild= localStorage.getItem("parentid")
    let newparent= JSON.parse(newchild)
    console.log(newparent);

    let childData ={ ...childby, userid:newparent._id}

    function handledisplay(e){
        e.preventDefault()
        axios.post('http://92.205.109.210:8037/api/login',childData)
            .then(res=>{
            console.log("Created...",res.data)
  
            // setchild(res.data.data)
            })
           .catch(err => console.error("API Error:", err));
    } 
    


      function handlechild(){
        axios.post('http://92.205.109.210:8037/api/getchild',{id: newparent._id})
            .then(res=>{
            console.log("child data received...",res.data)
            setchildby(res.data.data)
            })
           .catch(err => console.error("API Error:", err));
    } 
    
    useEffect(() => {
    handlechild()

    }, []);

    function handleEdit(childData){
        axios.post('http://92.205.109.210:8037/api/updatebyidchild',{id:childData,name:""})
        .then(res=>{
            console.log("Updated Child Successfully...",res.data);
            handlechild()
        })
        nav('/home')

    }

    function handledelete(childData){
        axios.post('http://92.205.109.210:8037/api/deletebyidchild',{id:childData})
        .then(res =>{
            console.log(' Child Deleted... ',res.data);
            handlechild()
            
        })
    }



  return (
    <Container className="mt-4">
          <div>
                <Card className="shadow p-3">
                    <Card.Body>
                        <Card.Title className="text-primary">Parent Details</Card.Title>
                        <Card.Text><strong>Parent Name:</strong> {newparent?.parentsname || "N/A"}</Card.Text>
                        <Card.Text><strong>Mobile Number:</strong> {newparent?.mobileno || "N/A"}</Card.Text>
                    </Card.Body>
                </Card>
          
               
            <h2 className="text-center mt-4">Children Details</h2>
            {childby.length > 0 ? (
                <div className="child-container">
                    {childby.map((child, index) => (
                        <Card className="shadow child-card" key={index}>
                            <Card.Body>
                                <Card.Title className="text-success">{child.name}</Card.Title>
                                <Card.Text><strong>Age:</strong> {child.age}</Card.Text>
                                <Card.Text><strong>Gender:</strong> {child.gender}</Card.Text>
                            </Card.Body>
                            <Button onClick={()=>handleEdit(child._id)} >Edit</Button>
                            <Button onClick={()=>handledelete(child._id)}>Delete</Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center">No child details available.</p>
            )}
       
       </div>
        </Container>
  )
} 
export default Profile