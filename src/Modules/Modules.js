import React,{ useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import './Modules.css'
import AddVehicle from "../AddVehicle/addVehicle";
import { Routes,Route } from "react-router-dom";
import Pending from "../Pending/Pending";
import Completed from "../Completed/Completed";
import {fetchVehicles} from '../redux/actionTypes'
import store from '../redux/store'
import Inventory from "../Inventory/Inventory";


const Modules = () =>{
    const [data,setData] = useState([]);
    
    //const store = useSelector((store)=> store.selectModule)
    store.subscribe(()=>{
        setData(store.getState().selectModule)
    })
    const dispatch = useDispatch()

    useEffect(()=>{
       
    dispatch(fetchVehicles())
              
    },[])
   
  
    return(
       
      <Routes>
          <Route path="/" element={ <AddVehicle/>}></Route>
          <Route path="/add" element={ <AddVehicle/>}></Route>
          <Route path="/pending" element={ <Pending store={data} />}></Route>
          <Route path="/completed" element={ <Completed store={data} />}></Route>
          <Route path="/inventory" element={<Inventory/>}></Route>
       </Routes>

    )

}

export default Modules;