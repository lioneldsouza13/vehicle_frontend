import AddInventory from "./AddInventory";
import store from "../redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {fetchInventory,deleteInventory} from '../redux/actionTypes'
const Inventory =()=>{
    
    const [inventory,setInventory] = useState([])
    store.subscribe(()=>{
        setInventory(store.getState().selectInventory)
    })

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchInventory())
    },[])

    const deletedInventory =(data)=>{
        dispatch(deleteInventory(data))
    }

    return(
        <div className="Inventory">
            <div className="row">
                <div className="col">
                <div className="container">
                <AddInventory inventory={inventory}/> 
                <br/>
                    <h3>Inventory</h3>
                    <hr/>
                {inventory.map((data)=>(
                      <>
                      <h2>{data.name.toUpperCase()}</h2>
                      <p>Remaining : {data.quantity} </p>
                      <button className="btn btn-danger" onClick={()=>deletedInventory(data)}>Delete</button>
                      <hr/>
                      </>
                  ))}

                { inventory.length==0 &&   <h2>No Items Added To Inventory</h2>  }
                </div>
               
                </div>
             </div>  
        </div>
    )
}


export default Inventory;