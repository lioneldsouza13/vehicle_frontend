import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css'

const Header = () =>{
    return(
    <div className="Header">
        <h1><u> {process.env.REACT_APP_PAGE}</u></h1>
        <hr/>
        <div className="bar">
        <Nav class="navbar navbar-expand-lg navbar-light">
        <Link to='/add' className="navbar-brand mb-0 h1">Add</Link>
        <Link to='/pending' className="navbar-brand mb-0 h1">Pending</Link>
        <Link to='/completed' className="navbar-brand mb-0 h1">Completed</Link>
        <Link to='/inventory' className="navbar-brand mb-0 h1">Inventory</Link>
        </Nav>
        </div>
    </div>        
    )

}

export default Header;