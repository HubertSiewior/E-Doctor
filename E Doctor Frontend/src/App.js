import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routing} from "./Routing";
import {NavbarMenu} from "./components/NavbarMenu";
import {Provider} from "react-redux";
import createStore from "./redux/store";
import {ErrorMessage} from "./components/ErrorMessage";


function App() {
    const store=createStore()
  return (
      <div>
          <Provider store={store}>
              <Router>
                  <NavbarMenu/>
                  <Routing/>
                  <ErrorMessage/>
              </Router>
          </Provider>
      </div>
  );
}

export default App;
