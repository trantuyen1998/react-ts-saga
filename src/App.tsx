import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Switch, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login"></Route>
        <Route path="/admin"></Route>
        <Route>
          {/* NOT FOUND */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
