
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation } from 'react-router';
import { NutritionDashboard } from './NutritionDashboard';


function Food() {
    const [food, setFood] = useState([])
    const [foodlist, setFoodlist] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isveg , setIsveg] = useState(false)
    const [total , setTotal] = useState({
        protein: 0,
        carbs: 0,
        fiber: 0,
        fat: 0
    })
    const [requiredNutrition, setRequiredNutrition] = useState()

    let loc = useLocation()
    console.log(loc,"location");
    let childNutrition= loc.state
    useEffect(() => {
      if (childNutrition) {
        setRequiredNutrition({
          protein: childNutrition.Protein || 0,
          carbs: childNutrition.Carbohydrates || 0,
          fat: childNutrition.Fat || 0,
          fiber: childNutrition.Fiber || 0
        });
      } else {
        console.warn("childNutrition is undefined");
      }
    }, [childNutrition]); 
    

    let parent = localStorage.getItem("parentId")
    let parentId = JSON.parse(parent)
    console.log(parentId);

    const [user, dispatch] = useReducer(addcart,{processbar:[], totalProtein: 0,totalCarbs:0,totalFiber:0, totalFat:0,overallPercentage:0})

    function addcart(user, action) {
        const requiredProtein = 51;
        const requiredCarbs = 200;
        const requiredFiber = 30;
        const requiredFat = 70;
    
        switch (action.type) {
            case "ADD":
                const updatedProtein = Number(user.totalProtein || 0) + Number(action.input.proteinAmount || 0);
                const updatedCarbs = Number(user.totalCarbs || 0) + Number(action.input.carbsAmount || 0);
                const updatedFat = Number(user.totalFat || 0) + Number(action.input.fatAmount || 0);
                const updatedFiber = Number(user.totalFiber || 0) + Number(action.input.fiberAmount || 0);

                console.log({
                    ...user,
                    processbar: [
                        ...user.processbar.filter(item => item.id !== action.input._id), 
                        { id: action.input._id, quantity: (user.processbar.find(item => item.id === action.input._id)?.quantity || 0) + 1 }
                    ],
                    totalProtein: updatedProtein,
                    totalCarbs: updatedCarbs,
                    totalFat: updatedFat,
                    totalFiber: updatedFiber,
                    overallPercentage: (
                        ((updatedProtein / requiredProtein) * 25) +
                        ((updatedCarbs / requiredCarbs) * 25) +
                        ((updatedFat / requiredFat) * 25) +
                        ((updatedFiber / requiredFiber) * 25)
                    ).toFixed(2) || 0 // Ensure fallback to 0
                });
                
    
                return {
                    ...user,
                    processbar: [
                        ...user.processbar.filter(item => item.id !== action.input._id), 
                        { id: action.input._id, quantity: (user.processbar.find(item => item.id === action.input._id)?.quantity || 0) + 1 }
                    ],
                    totalProtein: updatedProtein,
                    totalCarbs: updatedCarbs,
                    totalFat: updatedFat,
                    totalFiber: updatedFiber,
                    overallPercentage: (
                        ((updatedProtein / requiredProtein) * 25) +
                        ((updatedCarbs / requiredCarbs) * 25) +
                        ((updatedFat / requiredFat) * 25) +
                        ((updatedFiber / requiredFiber) * 25)
                    ).toFixed(2) || 0 // Ensure fallback to 0
                };
    
            case "REMOVE":
                const reducedProtein = Math.max(0, Number(user.totalProtein || 0) - Number(action.input.proteinAmount || 0));
                const reducedCarbs = Math.max(0, Number(user.totalCarbs || 0) - Number(action.input.carbsAmount || 0));
                const reducedFat = Math.max(0, Number(user.totalFat || 0) - Number(action.input.fatAmount || 0));
                const reducedFiber = Math.max(0, Number(user.totalFiber || 0) - Number(action.input.fiberAmount || 0));
    
                return {
                    ...user,
                    processbar: user.processbar
                        .map(item => item.id === action.input._id ? { ...item, quantity: item.quantity - 1 } : item)
                        .filter(item => item.quantity > 0),
                    totalProtein: reducedProtein,
                    totalCarbs: reducedCarbs,
                    totalFat: reducedFat,
                    totalFiber: reducedFiber,
                    overallPercentage: (
                        ((reducedProtein / requiredProtein) * 25) +
                        ((reducedCarbs / requiredCarbs) * 25) +
                        ((reducedFat / requiredFat) * 25) +
                        ((reducedFiber / requiredFiber) * 25)
                    ).toFixed(2) || 0
                };
    
            default:
                return user;
        }
    }
    
        
    

    function fetchdata(){
        axios.get('http://92.205.109.210:8037/food/getallfood')
        .then(res => {
            console.log(res.data.data);
            setFood(res.data.data.map(foodadd => ({...foodadd,qty: 0})))
            setFoodlist(res.data.data)
        })
    }
    useEffect(()=>{
        fetchdata()
    },[])

    function handlefilter(food){
        setSelectedCategory(food)
        if(isveg){
            axios.post("http://92.205.109.210:8037/food/getfoodlst",{type: "Veg" ,status:food})
            .then(res => {
                console.log([food],"food...", res.data );
                setFood(res.data.data.map(foodadd => ({...foodadd,qty: 0}))) 
            })
        }
        else{
        axios.post("http://92.205.109.210:8037/food/getfoodlst",{type: "" ,status: food })
        .then(res=> {
            console.log({food},"Food list..", res.data);
            setFood(res.data.data.map(foodadd => ({...foodadd,qty: 0})))
            })  
        }
    }
    const addtocart = (foodid) => { 
        console.log(foodid);
        
        axios.post('http://92.205.109.210:8037/food/getbyidfood',{id: foodid})
        .then(res => {
            console.log(res.data);
            let item = res.data.data 
            dispatch({ type: "ADD", input: item });
        })
    }

  return (
    <div>
        <div >
       
    <NutritionDashboard   user={user}/>

        </div>
        <div className='food-container'>
            <div className="food-list">
                <Navbar expand="lg" className="bg-body-tertiary">
                <Container className='container'>
                    <Nav className="me-auto">
                    <Nav.Link  onClick={() => fetchdata('All')}>All</Nav.Link>
                    <Nav.Link  onClick={() => handlefilter('P')}>Protien</Nav.Link>
                    <Nav.Link  onClick={() => handlefilter('C')}>Carbs</Nav.Link>
                    <Nav.Link  onClick={() => handlefilter('Fi')}>Fiber</Nav.Link>
                    <Nav.Link  onClick={() => handlefilter('F')}>Fat</Nav.Link>
                    <label> VEG
                        <input type='checkbox' onChange={() => setIsveg(!isveg)}checked={isveg}></input>
                    </label>
                    </Nav>
                </Container>
                </Navbar>
            </div>

            <div className="food-card">
                {food && food.map((food,index) => (
                    <Card >
                        {food.Image && <Card.Img variant="top" src={`http://92.205.109.210:8037/${food.Image}`} alt="Food" />}
                        <Card.Body>
                        <Card.Title> name: {food.foodName}</Card.Title>
                        <Card.Text>
                        <p>quantity: {food.quantity}</p>
                        <p>fatAmount: {food.fatAmount}</p>
                        <p>proteinAmount: {food.proteinAmount} kg</p>
                        <p>fiberAmount: {food.fiberAmount} cm</p>                        
                        <p>carbsAmount: {food.carbsAmount}</p>
                        </Card.Text>
                        <button onClick={() => addtocart(food._id)}>+</button>
                        <button>{user.processbar.find(item => item.id === food._id)?.quantity || 0}</button>
                        <button onClick={() => dispatch({type:"REMOVE", input: food})}>-</button>
                        <span ></span>
                        </Card.Body>
                        </Card>
                    ))}
            </div>
        </div>
    </div>
  )
}

export default Food



