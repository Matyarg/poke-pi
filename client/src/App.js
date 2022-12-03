import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Landing from './components/Landing';
import Home from './components/Home'
import Detail from './components/Detail';
import CreatePokemon from './components/CreatePokemon';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/createpokemon" component={CreatePokemon}/>
          <Route exact path="/pokemon/:id" component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
