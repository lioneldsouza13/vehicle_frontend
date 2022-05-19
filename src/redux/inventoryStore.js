import {GETINVENTORY,ADDINVENTORY,UPDATE_INVENTORY,DELETE_INVENTORY} from './actionTypes'
const selectInventory =(state=[],action)=>{
    
    switch(action.type){
        case GETINVENTORY:  return action.payload
        case ADDINVENTORY : return [...state,action.payload]
        case UPDATE_INVENTORY : {
            
            let updatedState = state.filter((data)=> {if(data.name === action.payload.name) return {...data,quantity:data.quantity+action.payload.quantity}})
            let updatedState1 = state.filter((data)=> data.name !== action.payload.name)
            return [...updatedState1,{_id:action.payload._id,name:action.payload.name,quantity:parseInt(updatedState[0].quantity) + parseInt(action.payload.quantity)}]
        }
        case DELETE_INVENTORY : return state.filter((data)=> data.name !== action.payload.name)
        default : return state
        
    }
    

}

export default selectInventory