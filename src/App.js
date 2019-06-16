import React from 'react';
import Header from './layouts/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SubHeader from './layouts/SubHeader';

library.add(fas);

function App() {
  return (
    <div id="content" className="app-content box-shadow-z0" role="main">
      <Header />
      <SubHeader />
      <div id="view" className="app-body">
        teste
      </div>
    </div>
  );
}

export default App;
