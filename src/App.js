
import './App.css';
import Header from './Header/Header'
import Modules from './Modules/Modules'
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter as Router} from 'react-router-dom'
import inventoryStore from './redux/inventoryStore';
function App() {
 
  return (
    <Router>
    <Provider store = {store} inventoryStore={inventoryStore}>
    <div className="App">
    <Header/>
    <Modules />
    </div>
    </Provider>
    </Router>
  );
}

export default App;
