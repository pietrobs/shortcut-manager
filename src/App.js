import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './containers/Index';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Index} />
      </div>
    </Router>
  );
}

export default App;
