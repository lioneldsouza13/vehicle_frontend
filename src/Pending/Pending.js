import { useEffect, useState } from "react";
import SinglePending from "./SinglePending";
const Pending =(data)=>{
  
   const [displayData,setDisplayData] = useState([])
    
    const nothingToDisplay =Object.entries(displayData).length  === 0 ? <div><br/><h1>No Pending Vehicles</h1></div>:" "

    useEffect(()=>{
       
        setDisplayData(data.store.filter(data1 =>data1.pending === true))
    },[data])

    const searchVehicle =(e)=>{
        e.preventDefault();
        setDisplayData(data.store.filter((data1) => {
            if(data1.pending === true && (data1.vehicleName.toLowerCase().includes((e.target.value).toLowerCase()) || (e.target.value).trim() === ""))
            return data1  
        } ))
        
    } 

    return(
        <div class="container">
            <br/>            <input type="text" className="input" onChange={searchVehicle} placeholder="Search ..."/>
            <div class="row">

            {nothingToDisplay}
            {displayData.map((data1)=>(
                 <div class="col">{<SinglePending key={data1} data={data1}/>}</div>
                 
            ))}

            
            </div>
        </div>
        
       
    )
}

export default Pending;