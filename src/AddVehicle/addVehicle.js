import {  useEffect, useState } from 'react';
import './addVehicle.css'
import { useDispatch } from 'react-redux';
import {insertVehicle} from '../redux/actionTypes'
const AddVehicle =()=>{
    const intialState ={
        vehicleName:'',
        vehicleNumber:'',
        vehicleOwner:'',
        mobile:'',
        problem:'',
        expectedCost:'',
        kms:'',
        expectedFixDate:'',
        createdDate:''
    }
    const initialErrorState ={
        vehicleName:true,
        vehicleNumber:true,
        vehicleOwner:true,
        mobile:true,
        problem:true,
        expectedCost:true,
        kms:true,
        expectedFixDate:true,
        invalidSubmit:true
    }
   
    const[state,setState] = useState(intialState)
    const [error,setError] = useState(initialErrorState);
    const numberValidate =['kms','mobile','expectedCost']

    const dispatch = useDispatch();
    const createDate = ()=>{
        const date = new Date();
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
    }

    const sendData =async ()=>{
        const currentDate = createDate();
        const data = {...state,createdDate:currentDate,pending:true}
        dispatch(insertVehicle(data))
        setState(intialState)
        setError(initialErrorState)
       
    }

    useEffect(()=>{
       const validSubmit = Object.values(error).join('').trim()==="true"
       setError({...error,invalidSubmit:!validSubmit})
    },[state])

    
    const handleVehicleState=(e)=>{
           e.preventDefault();
           
            if((e.target.value).trim() ==="" )
            {
                setError({...error,[e.target.name]:[e.target.name] +' should be a number'})
            }
            else if((numberValidate.includes(e.target.name)) && (e.target.value).trim()<0)
            {
                setError({...error,[e.target.name]:[e.target.name] +' cannot be Negative'})
            } 
            else{
               
                setError({...error,[e.target.name]:''})
            }
       
           setState({...state,[e.target.name]:e.target.value}) 
    }
    return(

        <form>
            <br/>
            <h3>ADD NEW VEHICLE</h3>
            
            <div className='container'>
            <div class="form-group row">
            <label for="vehicleName" class="col-sm-3 col-form-label">Vehicle Name </label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="vehicleName" placeholder="Vehicle Name" 
                onChange={handleVehicleState} name="vehicleName"
                value={state.vehicleName}/>
                <p class="error">{error.vehicleName}</p>
            </div>
            </div>
            <div class="form-group row">
            <label for="vehicleNumber" class="col-sm-3 col-form-label">Vehicle Number </label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="vehicleNumber" placeholder="Vehicle Number" 
                  onChange={handleVehicleState} name="vehicleNumber"
                  value={state.vehicleNumber}/>
                   <p class="error">{error.vehicleNumber}</p>
            </div>
            </div>
            <div class="form-group row">
            <label for="vehicleOwner" class="col-sm-3 col-form-label">Vehicle Owner </label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="vehicleOwner" placeholder="Vehicle Owner"
                  onChange={handleVehicleState} name="vehicleOwner" 
                  value={state.vehicleOwner}/>
                   <p class="error">{error.vehicleOwner}</p>
            </div>
            </div>
            <div class="form-group row">
            <label for="ownerMobile" class="col-sm-3 col-form-label">Owner Mobile No</label>
            <div class="col-sm-4">
                <input type="number" class="form-control" id="ownerMobile" placeholder="Owner Mobile no (+91)" 
                  onChange={handleVehicleState} name="mobile" 
                  value={state.mobile}/>
                   <p class="error">{error.mobile}</p>
            </div>
            </div>

            <div class="form-group row">
            <label for="problem" class="col-sm-3 col-form-label">Vehicle Problem</label>
            <div class="col-sm-4">
                <textarea class="form-control" id="problem" placeholder="Vehicle Problem" 
                  onChange={handleVehicleState} name="problem"
                  value={state.problem}/>
                   <p class="error">{error.problem}</p>
            </div>
            </div>
            <div class="form-group row">
            <label for="expectedCost" class="col-sm-3 col-form-label">Expected Cost </label>
            <div class="col-sm-4">
                <input type="number" class="form-control" id="expectedCose" placeholder="Expected Cost &#8377;"
                  onChange={handleVehicleState} name="expectedCost"
                  value={state.expectedCost} />
                   <p class="error">{error.expectedCost}</p>
            </div>
            </div>
            
            <div class="form-group row">
            <label for="kms" class="col-sm-3 col-form-label">KMS Driven </label>
            <div class="col-sm-4">
                <input type="number" class="form-control" id="kms" placeholder="KMS Driven" 
                  onChange={handleVehicleState} name="kms"
                  value={state.kms}/>
                   <p class="error">{error.kms}</p>
            </div>
            </div>

            <div class="form-group row">
            <label for="fixDate" class="col-sm-3 col-form-label">Expected Fix Date </label>
            <div class="col-sm-4">
                <input type="date" class="form-control" id="kms" placeholder="fixDate" 
                  onChange={handleVehicleState} name="expectedFixDate"
                  value={state.expectedFixDate}/>
                   <p class="error">{error.expectedFixDate}</p>
                
                <button type="button" class="btn btn-success" disabled={error.invalidSubmit}
                onClick={sendData}>Add Vehicle</button>
            </div>
            </div>

            </div>
        </form>
    )
}
export default AddVehicle;