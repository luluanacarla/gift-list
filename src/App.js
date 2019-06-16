import React from 'react';
import Header from './layouts/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SubHeader from './layouts/SubHeader';
import GiftList from './pages/GiftList';

library.add(fas);

const App = () => (
  <div id="content" className="app-content box-shadow-z0" role="main">
    <Header />
    <SubHeader />
    <div id="view" className="app-body">
      <GiftList />
    </div>
  </div>
);

export default App;
