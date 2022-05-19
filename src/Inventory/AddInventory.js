import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {insertInventory,updateInventory} from '../redux/actionTypes'


const AddInventory =(props)=>{
    const initialState ={
        name:'',
        quantity:'',
        touched:false,
        invalidSubmit:true
    }

    const [error,setError] = useState({ })
    const [state,setState]=useState(initialState)
    const numberValidation =['quantity']

    const handleInput =(e)=>{
        e.preventDefault();
        if(state.touched && e.target.value.trim()===""  ){
            setError({...error,[e.target.name]:e.target.name+' Cannot be blank' })
        }
        else if(state.touched && numberValidation.includes(e.target.name) && e.target.value<=0 ){
            setError({...error,[e.target.name]:e.target.name+' Cannot be Negative' })
        }
        else{
            setError({...error,[e.target.name]:''})
        }
      
       
        setState({...state,[e.target.name]:e.target.value.toLowerCase(),touched:true})
    }

    useEffect(()=>{
        const invalidSubmit = (error.name !== undefined && error.quantity !==undefined && error.name.trim() === "" && error.quantity.trim() ==="" )
        setState({...state,invalidSubmit:!invalidSubmit})
    },[state])
     const dispatch =useDispatch()
   
     const addInventory=()=>{
        dispatch(insertInventory(state))
        setState(initialState)
        setError({})
    }
    function findName(data){
        return data.name === state.name
    }
    const updatedInventory=()=>{
         let updatedState =[...props.inventory].find(findName)
        if(updatedState !=undefined){
        dispatch(updateInventory({...state,_id:updatedState._id}))
        }
        else
        {
            alert('Add Item to Inventory First')
        }
        setState(initialState)
        setError({})
       
    }

    return(
        <div className="container">
           <h3>Add Items To Inventory</h3>
           
           <input type="text" className="form-control" onChange={handleInput} name="name" placeholder="Name" value={state.name}/>
            <p className="alert-danger">{error.name}</p>
           <input type="number" className="form-control" onChange={handleInput} name="quantity" placeholder="Quantity LTRS/KGS" value={state.quantity}/>
           <p className="alert-danger">{error.quantity}</p>
           
           <button className="btn btn-success" disabled={state.invalidSubmit} onClick={addInventory}>Add</button>
           <button className="btn btn-danger" disabled={state.invalidSubmit} onClick={updatedInventory}>Update</button>
         </div>   
        
    )
}

export default AddInventory