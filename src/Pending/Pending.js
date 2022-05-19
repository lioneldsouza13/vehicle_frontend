import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInventory } from "../redux/actionTypes";
import SinglePending from "./SinglePending";
const Pending =(data)=>{
  
   const [displayData,setDisplayData] = useState([])
    
    const nothingToDisplay =Object.entries(displayData).length  === 0 ? <div><br/><h1>No Pending Vehicles</h1></div>:" "
    const dispatch = useDispatch()
    useEffect(()=>{
        setDisplayData(data.store.filter(data1 =>data1.pending === true))
    },[data])

    useEffect(()=>{
        dispatch(fetchInventory());
    },[])
    const searchVehicle =(e)=>{
        e.preventDefault();
        setDisplayData(data.store.filter((data1) => {
            if(data1.pending === true && (data1.vehicleName.toLowerCase().includes((e.target.value).toLowerCase()) || (e.target.value).trim() === ""))
            return data1  
        } ))
        
    } 

    return(
        <div className="container">
            <br/>            <input type="text" className="input" onChange={searchVehicle} placeholder="Search ..."/>
            <div className="row">

            {nothingToDisplay}
            {displayData.map((data1,index)=>(
                 <div className="col" key={index}>{<SinglePending key={index} data={data1}/>}</div>
                 
            ))}

            
            </div>
        </div>
        
       
    )
}

export default Pending;