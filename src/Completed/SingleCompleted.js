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
       
       <div className="card" >
    <div className="card-body">
    <h5 className="card-title">{props.data.vehicleName}</h5>
    <p className="card-text">{props.data.vehicleNumber}</p>
    <p className="card-text">{props.data.vehicleOwner}</p>
    <p className="card-text">{props.data.mobile}</p>
    <p className="card-text">Problems : {props.data.problem}</p>
    <p className="card-text">Cost : Rs.{props.data.expectedCost} </p>
    <p className="card-text">Driven : {props.data.kms} Kms</p>
    <p className="card-text">Date :{props.data.expectedFixDate}</p>
    <p className="card-text">{props.data.createdDate}</p>
    <h5 class="card-text"> Inventory Used</h5>
    <hr/>
    {props.data.inventory!== undefined && props.data.inventory.map((data)=>(
      <p class="card-text">{data.name.toUpperCase()} : {data.quantity}</p>
    ))}
    <button className='Success' onClick={()=>changeType()}>Pending</button>
    </div>
   
    </div>
  
    

    )
}

export default SingleCompleted