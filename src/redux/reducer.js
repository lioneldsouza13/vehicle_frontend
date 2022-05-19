import { combineReducers } from "redux";
import selectModule from './actionLogic'
import selectInventory from "./inventoryStore";
const rootReducer = combineReducers({selectModule,selectInventory});

export default rootReducer;