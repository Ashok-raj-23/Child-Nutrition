import { logDOM } from '@testing-library/dom';
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation } from 'react-router-dom';


function Food() {
    const[food,setfood] = useState([])
    const[foodlist,setfoodlist] = useState("All")
    const [istrue,setistrue] = useState(false)
    const [total ,settotal] = useState({
      Protein:0,
      Carbs:0,
      Fiber:0,
      Fat:0,
    })

    
    let loc = useLocation()
    console.log(loc,"location");
    const childId = loc.state
    
    let parent= localStorage.getItem("parentId")
    let parentId= JSON.parse(parent)
    console.log(parentId);



    const [state,dispatch] = useReducer(foodcart,{processbar:[],totalProtein:0, totalCarbs:0,totalFiber:0,totalFat:0})


   
    
function foodcart(state,action){
  console.log(action,"action");
  switch(action.type){
    case "ADD":

      axios.post('http://92.205.109.210:8037/report/create',{childid:childId,
        parentid:parentId,
        date:new Date(),
        protein: {
          required: "20",
          achieved: action.input.proteinAmount
      },
      fiber: {
          required: "25",
          achieved: action.input.fiberAmount
      },
      carbs: {
          required: "10",
          achieved: action.input.carbsAmount
      },
      fat: {
          required: "10",
          achieved: action.input.fatAmount
      },
      overallpercent:"20",
      food:[
        {
          foodid:action.input._id,
          quantity:1
        }
      ]
      })
      .then(res=>{
        console.log("New Report Created:",res.data);
        localStorage.getItem(res.data.data.name,JSON.stringify(res.data.data))
      })
      .catch(err => console.error("Error creating report:", err));

    
      return {processbar:[...state.processbar,action.input],
        totalProtein:Number(state.totalProtein)+Number(action.input.proteinAmount || 0),
        totalCarbs:Number(state.totalCarbs)+Number(action.input.carbsAmount || 0),
        totalFiber:Number(state.totalFiber)+Number(action.input.fiberAmount || 0),
        totalFat:Number(state.totalFat)+Number(action.input.fatAmount || 0),

      }
    case "REMOVE":
      return {processbar:state.processbar.filter(food=>food._id !== action.input),
        totalProtein:Math.max(0,Number(state.totalProtein) - Number(action.input.proteinAmount || 0)),
        totalCarbs: Math.max(0, Number(state.totalCarbs) - Number(action.input.carbsAmount || 0)),
        totalFiber: Math.max(0, Number(state.totalFiber) - Number(action.input.fiberAmount || 0)),
        totalFat: Math.max(0, Number(state.totalFat) - Number(action.input.fatAmount || 0)),
      }
      default:
          return state;

  }


}



    function handleallFood(){
      
        axios.get('http://92.205.109.210:8037/food/getallfood')
        .then(res=>{
          console.log( res.data.data);
          setfood(res.data.data.map(fooditem=>({...fooditem,qty: 0})));
            
        })

    }
    useEffect(()=>{
        handleallFood()
    },[])


    function handlefoodlist(foods,e) {
      e.preventDefault(); 
      setfoodlist(foods);
      if(istrue){
      axios.post('http://92.205.109.210:8037/food/getfoodlst', { type: "Veg",status: foods })
      .then(res => {
        console.log( [foods],"Food List...", res.data);
        setfood(res.data.data.map(fooditem=>({...fooditem,qty: 0})));

    })
    .catch(err => console.error("Error fetching food data:", err));

  }else{
      axios.post('http://92.205.109.210:8037/food/getfoodlst', { type: "",status: foods })
      .then(res => {
          console.log(`${foods} Food List Response:`, res.data);
          setfood(res.data.data.map(fooditem=>({...fooditem,qty: 0})));

      })
      .catch(err => console.error("Error fetching filtered food data:", err));

    }
  }

  const increment = (foodid)=>{
    console.log(foodid);
    axios.post('http://92.205.109.210:8037/food/getbyidfood',{id:foodid})
    .then(res=>{
      console.log(res.data);
      let item =res.data.data
      dispatch({type:"ADD",input:item})
     
      
    })
  }
 





  

  return (
    <div>
<div>
<Container className="my-4 d-flex justify-content-center">
  <Card style={{ width: '22rem' }} className="text-center shadow-lg p-3">
    <Card.Body>
      <Card.Title className="fw-bold">Nutritional Summary</Card.Title>
      <Card.Text>
        <h5>Total Protein: {Number(state.totalProtein).toFixed(2)}g</h5>
        <h5>Total Carbs: {Number(state.totalCarbs).toFixed(2)}g</h5>
        <h5>Total Fiber: {Number(state.totalFiber).toFixed(2)}g</h5>
        <h5>Total Fat: {Number(state.totalFat).toFixed(2)}g</h5>
      </Card.Text>
    </Card.Body>
  </Card>
</Container>

      </div>


        <div>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={()=>handleallFood()}>ALL</Nav.Link>
            <Nav.Link onClick={(e) => handlefoodlist("P",e)}>Protein</Nav.Link>
            <Nav.Link onClick={(e) => handlefoodlist("C" ,e)}>Carbs</Nav.Link>
            <Nav.Link onClick={(e) => handlefoodlist("Fi",e)}>Fiber</Nav.Link>
            <Nav.Link onClick={(e) => handlefoodlist("F",e)}>Fat</Nav.Link>
            <label>
              Veg <input type='checkbox' onChange={()=>setistrue(!istrue)} checked={istrue}/>
            </label>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>


<Container className="food-container">
        {food?.map((food ,index) => (
              <Card className="food-card" key={index} style={{ width: '18rem' }}>
                {food.Image && <Card.Img variant="top" src={`http://92.205.109.210:8037/${food.Image}`} className="food-image" />}

                  <Card.Body>
                      <Card.Title>Food Name: {food.foodName}</Card.Title>
                      <Card.Text>
                          <p>Quantity: {food.quantity}</p>
                          <p>FatAmount: {food.fatAmount}</p>
                          <p>ProteinAmount: {food.proteinAmount}</p>
                          <p>FiberAmount: {food.fiberAmount}</p>
                          <p>CarbsAmount: {food.carbsAmount}</p>
                          <div className="qty-buttons">
                          <Button onClick={()=>increment(food._id)}>+</Button>
                          {/* <span className="qty-count">{food.qty}</span> */}

                       <Button onClick={()=>dispatch({type:"REMOVE",input:food})}>-</Button>    
    
                          </div>
                       
                      </Card.Text>
                  </Card.Body>
              </Card>
          ))}
        </Container>
    </div>
  )
}

export default Food