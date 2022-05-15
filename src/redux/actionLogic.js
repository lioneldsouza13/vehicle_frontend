import {MODULE_ADD_VEHICLE,VEHICLE_COMPLETED,GETVEHICLES} from './actionTypes'


const selectModule = (state=[],action)=>{
   
    switch(action.type){
        
        case MODULE_ADD_VEHICLE :  return [...state,action.payload]
        case VEHICLE_COMPLETED :{
          
            let state1 = [...state].filter(data => data.vehicleName !== action.payload.vehicleName)
           
            return [...state1,action.payload]
            
        }
        case GETVEHICLES : return action.payload
        
        default :return state
        

    }
   
}


export default selectModule;