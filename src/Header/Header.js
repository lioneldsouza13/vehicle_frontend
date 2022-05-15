import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () =>{
    return(
    <div className="Header">
        <h1><u>Vehicle Management</u></h1>
        <hr/>
        <div className="bar">
        <Nav class="navbar navbar-expand-lg navbar-light">
        <Link to='/add' class="navbar-brand mb-0 h1">Add</Link>
        <Link to='/pending' class="navbar-brand mb-0 h1">Pending</Link>
        <Link to='/completed' class="navbar-brand mb-0 h1">Completed</Link>
        </Nav>
        </div>
    </div>        
    )

}

export default Header;