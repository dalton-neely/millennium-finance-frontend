import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Data} from "./Data";
import {Chart} from "./Chart";

function App() {
  return (
    <div className="App">
      <h1>Millennium Finance</h1>
        <BrowserRouter>
            [ <Link to="/">home</Link> ]
            [ <Link to="/data">data</Link> ]
            [ <Link to="/chart">chart</Link> ]
            <Route path='/data' component={Data}/>
            <Route path='/chart' component={Chart}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
