import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamCard from './StreamCard.jsx';

const Stream_Catelog = (props) => {

  let [streamList, changeStreamList] = useState([]);
  let [pagination, changePage] = useState({});

  var createChange = () => {
    axios.get('/random')
      .then(res => {
        // console.log(res.data.data);
        changeStreamList(res.data.data);
        // console.log(res.data.pagination);
        changePage(res.data.pagination);
        var randKey = Math.floor(Math.random() * streamList.length - 1);
        randKey = randKey < 0 ? 0 : randKey;
        if (streamList.length !== 0) {
          props.changeStream(streamList[randKey].user_name, streamList[randKey]);
        }
      })
  }
  useEffect(() => {
    createChange()
  }, [])
  // createChange();
  // console.log(streamList);


  return (
    <div className="view">
      <button className="view-btn rand" onClick={() => {
        var randKey = Math.floor(Math.random() * streamList.length - 1);
        randKey = randKey < 0 ? 0 : randKey;
        props.changeStream(streamList[randKey].user_name, streamList[randKey]);
      }}>Random Stream</button>
      <button className="view-btn generate" onClick={createChange}>Generate List</button>
      <div className="catelog" id="stream-list">
        {
          streamList.map((stream) => {
            // console.log(stream);
            var url = 'https://twitch.tv/' + stream.user_login;

            return <StreamCard key={stream.id} url={url} stream={stream} changeStream={props.changeStream} />
          })
        }
      </div>
    </div >
  )
}

export default Stream_Catelog;