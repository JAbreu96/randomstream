import React from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const StreamPlayer = (props) => {

  return (
    <div>
      <ReactTwitchEmbedVideo channel={props.channel} width="100%" height="700" theme="light" muted='true' />
    </div>
  )
}

export default StreamPlayer;