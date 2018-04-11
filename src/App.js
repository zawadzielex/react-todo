import React, { Component } from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Lists from './components/Lists';
import List from './components/List';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="App-intro">
              <Switch>
                <Route exact path="/" component={Lists} />
                <Route exact path="/list/:id" component={List} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
