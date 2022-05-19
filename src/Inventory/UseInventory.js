import { useEffect,useState } from "react";
import { Modal,Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { calculateInventory, removeInventoryItem ,removeInventory,updatedInventory} from "../redux/actionTypes";
import store from "../redux/store";
import './Inventory.css'

const UseInventory =({handleInventory,showInventory,vehicle})=>{
    const [show, setShow] = useState(showInventory);
    const [state,setState] = useState(store.getState().selectInventory)
    const [inventory,setInventory] = useState([]);
    const [name,setName]=useState("")
    const [quantity,setQuantity] = useState('')
    const [addedInventory,setAddedInventory]=useState([])
    const [invalidSubmit,setInvalidSubmit]=useState(true)    

    store.subscribe(()=>{
        setState(store.getState().selectInventory)
       
    })
    
    useEffect(()=>{
      
      if(state.length>0){
      setName(state[0].name)
      setInventory(state[0])  
      }
    },[state])

   useEffect(()=>{
        setShow(showInventory)
   },[showInventory])
   

   useEffect(()=>{
     if(vehicle.inventory!== undefined )
    setAddedInventory(vehicle.inventory)
},[vehicle])

  const handleClose = () => {
    handleInventory(false)
    if(addedInventory.length>0 && addedInventory.length !== vehicle.inventory.length)
    dispatch(calculateInventory({...vehicle,inventory:addedInventory}))
    setAddedInventory(vehicle.inventory)
    }
    
    function getQuantity (data){
            return data.name === name.toLowerCase() 
    }
    const handleInput =(e)=>{
        e.preventDefault();
        setName(e.target.value.toLowerCase())
        
    }

    const dispatch = useDispatch()
    const addInventoryData =()=>{
        if(parseInt(inventory.quantity)>= parseInt(quantity)){
        setAddedInventory([...addedInventory,{_id:inventory._id,name:name,quantity:quantity}])
        dispatch(updatedInventory({_id:inventory._id,name:name,quantity:-quantity}))
        setName(state[0].name)
        }
        else
        alert('Quantity cannot be more than remaining')
        setQuantity('')
       
    }
   


    const handleQuantity =(e)=>{
        e.preventDefault()
        setQuantity(e.target.value)
       
    }

    const removeItemfromInventory =(data)=>{
      let newInventory = addedInventory.filter((data1)=> data1.name !== data.name)
      setAddedInventory(newInventory)

        dispatch(removeInventoryItem(data)) 
        dispatch(removeInventory({...vehicle,inventory:newInventory}))
     
    }

    useEffect(()=>{
        const data1 = [...state].find(getQuantity)
        if(data1 != undefined)
        setInventory(data1)
    },[name])

    useEffect(()=>{
        
    const validSubmit = quantity.trim() !== ""
    setInvalidSubmit(!validSubmit)

  },[quantity])


    return(
        <Modal show={show} onHide={handleClose} className='modal'>
        <Modal.Header >
          <Modal.Title>Edit Inventory Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <div className="container">
                 <div className="inventory">
                 <div className="col-xs-4 col-sm-4">
             <select onChange={handleInput} value={name.toUpperCase()} className="form-select">
            {state.map((data)=>(
               
                   <option  key={data.name}  >{data.name.toUpperCase()}</option>    
              
                
            ))}
            </select>    
            </div>
             <p> Remaining : {inventory.quantity}</p>   
             <div className="col-sm-4 col-xs-2">
                     <input type="number" value={quantity} placeholder="USE" className="form-control" onChange={handleQuantity}/>  
                     <br/>
                     <button className="btn btn-success" disabled={invalidSubmit} onClick={addInventoryData}> ADD </button> 
            </div>
            {addedInventory!=undefined  && addedInventory.map((data)=>(
                    <>
                    <p class="h4">{data.name.toUpperCase()} {data.quantity}</p>
                    <button className="btn btn-danger" onClick={()=>removeItemfromInventory(data)}>Delete</button>
                    </>
            ))}
            </div>
            </div>
            </Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button className='btn btn-danger' variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    )
}

export default UseInventory;