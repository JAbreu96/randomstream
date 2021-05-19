import React from 'react';

import Stream_Catelog from './subcomponents/Stream_Catelog.jsx';
// import Cats from './Cats.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Twitch Switch</h1>
        </header>
        <Stream_Catelog />

      </React.Fragment>
    )
  }
}

export default App;