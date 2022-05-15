import '../Pending/SinglePending.css'
import {updateVehicle} from '../redux/actionTypes'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
const SingleCompleted = (props)=>{
    const dispatch = useDispatch()
    const [state,setState] = useState({})
    
    const changeType =()=>{
        setState({...props.data,pending:true}) 
    }
    useEffect(()=>{
       if(Object.keys(state).length !==0)
        dispatch(updateVehicle(state))

    },[state])

    return(
       
       <div class="card" >
    <div class="card-body">
    <h5 class="card-title">{props.data.vehicleName}</h5>
    <p class="card-text">{props.data.vehicleNumber}</p>
    <p class="card-text">{props.data.vehicleOwner}</p>
    <p class="card-text">{props.data.mobile}</p>
    <p class="card-text">Problems : {props.data.problem}</p>
    <p class="card-text">Cost : Rs.{props.data.expectedCost} </p>
    <p class="card-text">Driven : {props.data.kms} Kms</p>
    <p class="card-text">Date :{props.data.expectedFixDate}</p>
    <p class="card-text">{props.data.createdDate}</p>
    <button className='Success' onClick={()=>changeType()}>Pending</button>
    </div>
   
    </div>
  
    

    )
}

export default SingleCompleted