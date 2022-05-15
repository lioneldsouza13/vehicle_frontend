export const MODULE_ADD_VEHICLE ="ADD_VEHICLE"
export const VEHICLE_COMPLETED ='VEHICLE_COMPLETED'
export const GETVEHICLES ='GETVEHICLES'

export const addVehicle =(payload)=>{
    return {
        type : MODULE_ADD_VEHICLE,
        payload:payload
    }
}

export const vehicleCompleted =(payload)=>{
    return{
        type : VEHICLE_COMPLETED,
        payload:payload
    }
}
export const getVehicles =(payload)=>{
        return {
            type:GETVEHICLES,
            payload:payload
        }
}

export const fetchVehicles =(payload)=>{
   return (dispatch)=>{
    fetch(process.env.REACT_APP_URL+'/vehicles').then((res)=>res.json()).then((data)=>{
            dispatch(getVehicles(data))
         }).catch(()=>{
      
         })
   }
}

export const insertVehicle =(state)=>{
    return (dispatch)=>{
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/addVehicle',requestOptions).then((res)=>res.json()).then((data)=>{
           
            dispatch(fetchVehicles())
            alert(data.message)
        }).catch((res)=>alert(res.message))
    }
}

export const updateVehicle =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/vehicles/'+state._id,requestOptions).then((res)=>res.json()).then((data)=>{
            dispatch(fetchVehicles())
            alert(data.message)
        }).catch((res)=>alert(res.message))
    }
}


export const deleteVehicle =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/vehicles/'+state._id,requestOptions).then((res)=>res.json()).then((data)=>{
            dispatch(fetchVehicles())
            alert(data.message)
        }).catch((res)=>alert(res.message))
    }
}