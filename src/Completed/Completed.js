import { useEffect, useState } from "react"
import SingleCompleted from "./SingleCompleted"

const Completed =(data)=>{
    const [displayData,setDisplayData] = useState(data.store.filter(data1 =>data1.pending === false))
    
    const nothingToDisplay =Object.entries(displayData).length  === 0 ? <div><br/><h1>No Completed Vehicles</h1></div>:" "
    useEffect(()=>{
        
        
        setDisplayData(data.store.filter(data1 =>data1.pending === false))
      
    },[data])


    
    const searchVehicle =(e)=>{
        e.preventDefault();
        setDisplayData(data.store.filter((data1) => {
            if(data1.pending === false && (data1.vehicleName.toLowerCase().includes((e.target.value).toLowerCase()) || (e.target.value).trim() === ""))
            return data1  
        } ))
        
    } 
    return(
        <div class="container">
            <br/>
            <input type="text" className="input" onChange={searchVehicle} placeholder="Search ..."/>
            <div className="row">

            {nothingToDisplay}
            {displayData.map((data1)=>(
                 <div className="col" >{<SingleCompleted data={data1}/>}</div>
            ))}
            </div>
        </div>
        
       
    )
}

export default Completed;