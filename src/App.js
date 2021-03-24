import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from './components/Menubar'
import Home from './components/Home'
import Indo from './components/Indo'
import Vaksin from './components/Vaksinasi'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App" style={{backgroundColor: "#ebebeb"}}>
      <Router>
        <Menubar/>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/indonesia" component={Indo}/>
          <Route exact path="/vaksin" component={Vaksin}/>
        </Switch>

        <Footer/>
      </Router>
    </div>
  );
}

export default App;
