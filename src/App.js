import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Data} from "./Data";
import {Chart} from "./Chart";
import {BotPage} from "./pages/bot-page";

function App() {
  return (
    <div className="App">
      <h1>Millennium Finance</h1>
        <BrowserRouter>
            [ <Link to="/">home</Link> ]
            [ <Link to="/data/BTCUSD/1m/1000">data</Link> ]
            [ <Link to="/chart/BTCUSD/1m/1000">chart</Link> ]
            [ <Link to="/bot">bot</Link> ]
            <Route path='/data/:symbol/:interval/:limit' component={Data}/>
            <Route path='/chart/:symbol/:interval/:limit' component={Chart}/>
            <Route path="/bot" component={BotPage}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
