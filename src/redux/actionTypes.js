export const MODULE_ADD_VEHICLE ="ADD_VEHICLE"
export const VEHICLE_COMPLETED ='VEHICLE_COMPLETED'
export const GETVEHICLES ='GETVEHICLES'
export const GETINVENTORY ='GETINVENTORY'
export const ADDINVENTORY ='ADD_INVENTORY'
export const UPDATE_INVENTORY ='UPDATE_INVENTORY'
export const DELETE_INVENTORY ='DELETE_INVENTORY'
export const REMOVE_INVENTORY ='REMOVE_INVENTORY'

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

export const fetchVehicles =()=>{
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
export const getInventory =(data)=>{
    return {
        type:GETINVENTORY,
        payload:data
    }
}
export const fetchInventory =()=>{
    return (dispatch)=>{
        fetch(process.env.REACT_APP_URL+'/inventory').then((res)=>res.json()).then((data)=>{
                dispatch(getInventory(data))
             }).catch(()=>{
               
             })
       }
}

export const addInventory =(state)=>{
    return {
        type:ADDINVENTORY,
        payload:state
    }
}
export const insertInventory=(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/addInventory',requestOptions).then((res)=>res.json()).then((data)=>{
            if(data.message === 'Added to Inventory')
            dispatch(fetchInventory())
        
        }).catch((res)=>alert(res.message))
    }
}
export const updatedInventory =(state)=>{
    return {
        type:UPDATE_INVENTORY,
        payload:state
    }
}

export const updateInventory =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
       
        fetch(process.env.REACT_APP_URL+'/addInventory/'+state._id,requestOptions).then((res)=>res.json()).then((data)=>{
            if(data.message === 'Quantity Updated')
            dispatch(updatedInventory(state))
            
           
        }).catch((res)=>alert(res.message))
    }
}
export const deleteCurrentInventory =(state)=>{
    return {
        type:DELETE_INVENTORY,
        payload:state
    }
}

export const deleteInventory =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/addInventory/'+state._id,requestOptions).then((res)=>res.json()).then((data)=>{
            if(data.message === 'Data Deleted')
            dispatch(deleteCurrentInventory(state))
            
            alert(data.message)
        }).catch((res)=>alert(res.message))
    }
}

export const calculateInventory =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
       
        fetch(process.env.REACT_APP_URL+'/vehicles/'+state._id,requestOptions).then((res)=>res.json()).then((data)=>{
            dispatch(deductInventory(state.inventory))
            dispatch(fetchVehicles())
            
        }).catch((res)=>alert(res.message))
    }   
}

export const deductInventory =(state)=>{
    return(dispatch)=>{
        const requestOptions ={
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(state)
        }
        
        fetch(process.env.REACT_APP_URL+'/deductInventory',requestOptions).then((res)=>res.json()).then((data)=>{
            if(data.message === 'Quantity Updated'){
            dispatch(fetchInventory())
            dispatch(fetchVehicles()) 
        }
        }).catch((res)=>alert(res.message))
    }
}

export const removeInventoryItem =(data)=>{
    return(dispatch)=>{
        dispatch(updateInventory(data))
        
    }
    
}
export const removeInventory =(state)=>{
    return updateVehicle(state)
}