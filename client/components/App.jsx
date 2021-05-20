import React from 'react';

import Stream_Catelog from './subcomponents/Stream_Catelog.jsx';
import StreamPlayer from './subcomponents/StreamPlayer.jsx';
import ChannelList from './subcomponents/ChannelList.jsx';

let cachedState = null;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = cachedState !== null ? cachedState : {
      togglePlayer: false,
      currentPlayer: <div></div>,
      listChannel: []
    }
    this.handleStreamChange = this.handleStreamChange.bind(this);
  }

  handleStreamChange(channelName, stream) {
    var list = this.state.listChannel;
    if (!list.includes(channelName)) {
      list.push(channelName);
    }
    if (list.length > 11) {
      list.shift();
    }

    this.setState({
      togglePlayer: true,
      currentPlayer: <StreamPlayer stream={stream} channel={channelName} />,
      listChannel: list
    })
  }

  componentWillUnmount() {
    cachedState = this.state;
  }

  componentDidMount() {
    this.setState({
      togglePlayer: true,
      currentPlayer: <div></div>
    })
  }
  render() {
    return (
      <React.Fragment>
        <header className="nav-bar">
          <h1 className="nav-bar-logo">Twitch Switch</h1>
        </header>
        <div>
          <ChannelList list={this.state.listChannel} changeStream={this.handleStreamChange} />
          {this.state.currentPlayer}
        </div>
        <Stream_Catelog changeStream={this.handleStreamChange} />
        <footer className='footer'>
          <h3>Contact Me!</h3>
          <h3>abreujoelchrist@gmail.com</h3>
        </footer>
      </React.Fragment>
    )
  }
}

export default App;