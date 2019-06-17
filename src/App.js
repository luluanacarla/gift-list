import React from 'react';
import Header from './layouts/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SubHeader from './layouts/SubHeader';
import GiftList from './pages/GiftList';
import Footer from './layouts/Footer';

library.add(fas);

const App = () => (
  <div id="content" className="app-content box-shadow-z0" role="main">
    <Header />
    <SubHeader />
    <div id="view" className="app-body">
      <GiftList />
    </div>
    <Footer />
  </div>
);

export default App;
