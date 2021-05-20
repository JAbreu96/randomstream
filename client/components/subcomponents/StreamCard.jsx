import React from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const StreamCard = (props) => {
  // console.log(props.stream);
  var { thumbnail_url, game_name, user_name, viewer_count, started_at, title, language } = props.stream
  thumbnail_url = thumbnail_url.split('{height}').join('300').split('{width}').join('250');
  title = title.split('[Nopixel] ');
  return (
    <div className='stream-card'>
      <div className='stream-card-visual'>
        <img src={thumbnail_url} alt="thumbnail" className="stream-card-visual-img" />
      </div>
      <div className='stream-card-info'>
        <div className="stream-card-broadcastinfo">
          <h2 className='stream-card-username'>{user_name}</h2>
          <h3 className='stream-card-title'>{title}</h3>
          <h3 className='stream-card-game'>{game_name}</h3>
        </div>
        <div className="stream-card-etc">
          <button className='stream-card-link' onClick={(e) => {
            window.scrollTo(0, 0);
            document.getElementById('stream-list').scrollTo(0, 0);
            props.changeStream(user_name, props.stream)
          }}>Watch</button>
          <p className='stream-card-viewcount'>Viewers: {viewer_count}</p>
          <p className='stream-card-startstamp'>Broadcast Time: {started_at}</p>
          <p className='stream-card-language'>Language: {language}</p>
        </div>
      </div>
    </div>
  )
}

export default StreamCard;