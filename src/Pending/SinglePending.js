import './SinglePending.css'
import {updateVehicle,deleteVehicle} from '../redux/actionTypes'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {Button,Modal} from 'react-bootstrap'
import UseInventory from '../Inventory/UseInventory'
const SinglePending = (props)=>{
 
    const [error,setError] = useState({});
    const numberValidate =['kms','mobile','expectedCost']

    const dispatch = useDispatch()
    const [state,setState] = useState(props.data)
    const [show, setShow] = useState(false);
    const [showInventory,setShowInventory] =useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[invalidSubmit,setInvalidSubmit] =useState(false)

    const handleInventory=(data)=>{
        setShowInventory(data)
    }
    const changeType =(pending)=>{
      
        dispatch(updateVehicle({...state,pending:pending}))
        handleClose();
    }
    const deleteData =()=>{
        dispatch(deleteVehicle({...state,deleted:true}))
        handleClose();
    }
    useEffect(()=>{
        const validSubmit = Object.values(error).join('').trim()===""
        setInvalidSubmit(!validSubmit)
     },[state])

     useEffect(()=>{
     setState(props.data)
   },[props])

     const InventoryData =()=>{
      setShowInventory(true)
     }
 
     
     const handleVehicleState=(e)=>{
            e.preventDefault();
            
             if((e.target.value).trim() ==="" )
             {
                 setError({...error,[e.target.name]:[e.target.name] +' should be a blank'})
             }
             else if((numberValidate.includes(e.target.name)) && (e.target.value).trim()<0)
             {
                 setError({...error,[e.target.name]:[e.target.name] +' cannot be Negative'})
             } 
             else{
                
                 setError({...error,[e.target.name]:''})
             }
        
            setState({...state,[e.target.name]:e.target.value}) 
     }


    const editOption =(props)=>{
        return(
            <div className='edit'>
            <div class="card" >
            <div class="card-body">
            
            <div className='container'>
            <div className='row'>
            <p>Vehicle Name :</p> 
                <input type="text" className="card-text" name='vehicleName' value={state.vehicleName} onChange={handleVehicleState}/>
                <p>{error.vehicleName}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>Vehicle Number :</p> 
                <input type="text" className="card-text" name='vehicleNumber' value={state.vehicleNumber} onChange={handleVehicleState}/>
                <p>{error.vehicleNumber}</p>
            </div>
            </div>
            
            <div className='container'>
            <div className='row'>
            <p>Vehicle Owner :</p> 
            <input type="text" className="card-text" name='vehicleOwner' value={state.vehicleOwner} onChange={handleVehicleState}/>
            <p>{error.vehicleOwner}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>Owner Mobile :</p> 
            <input type="number"  className="card-text" name="mobile" value={state.mobile} onChange={handleVehicleState}/>
            <p>{error.mobile}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>Problem :</p> 
            <textarea className="card-text" name= "problem" value={state.problem} onChange={handleVehicleState}></textarea>
            <p>{error.problem}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>Expected Cost :</p> 
            <input type="number"  className="card-text" name="expectedCost" value={state.expectedCost} onChange={handleVehicleState}/>
            <p>{error.expectedCost}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>Expected Fix Date :</p> 
            <input type="date" className="card-text" name="expectedFixDate" value={state.expectedFixDate} onChange={handleVehicleState}/>
            <p>{error.expectedFixDate}</p>
            </div>
            </div>
            <div className='container'>
            <div className='row'>
            <p>KMS :</p> 
            <input type="number" className="card-text" name="kms" value={state.kms} onChange={handleVehicleState}/>
            </div>
            </div>
           
            <p className="card-text">Created Date :{state.createdDate}</p>
           
            </div>
           
            </div>
            </div>
          
            
        
            )
    }


    return(
     <div>
    <div class="card" >
    <div class="card-body">
    <h5 class="card-title">{props.data.vehicleName}</h5>
    <p class="card-text">{props.data.vehicleNumber}</p>
    <p class="card-text">{props.data.vehicleOwner}</p>
    <p class="card-text">{props.data.mobile}</p>
    <h5 class="card-text">Problems : {props.data.problem}</h5>
    <p class="card-text">Cost : Rs.{props.data.expectedCost} </p>
    <p class="card-text">Driven : {props.data.kms} Kms</p>
    <p class="card-text">Date :{props.data.expectedFixDate}</p>
    <p class="card-text">{props.data.createdDate}</p>
    <h5 class="card-text"> Inventory Used</h5>
    <hr/>
    {props.data.inventory!== undefined && props.data.inventory.map((data)=>(
      <p class="card-text">{data.name.toUpperCase()} : {data.quantity}</p>
    ))}
    
  
      <button className='Success'onClick={handleShow}>Edit</button> &nbsp;
    <button className='Success' onClick={()=>changeType(false)}>Completed</button>
    <button className='btn btn-danger' onClick={()=>deleteData()}>Delete</button>
    <button className='btn btn-danger' onClick={()=>InventoryData()}>Inventory</button>
    </div>
    </div>  

    <Modal show={show} onHide={handleClose} className='modal'>
        <Modal.Header >
          <Modal.Title>Edit Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{editOption(props)}</Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button className='btn btn-danger' variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btn-success' variant="primary" disabled={invalidSubmit} onClick={()=>changeType(true)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <UseInventory handleInventory={handleInventory} showInventory={showInventory} vehicle={state}/>
    </div>
  
    
      
    )
}

export default SinglePending ;