import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamCard from './StreamCard.jsx';

const Stream_Catelog = () => {

  let [streamList, changeStreamList] = useState([]);
  let [pagination, changePage] = useState({});

  useEffect(() => {
    axios.get('/random')
      .then(res => {
        // console.log(res.data.data);
        changeStreamList(res.data.data);
        // console.log(res.data.pagination);
        changePage(res.data.pagination);
      })
  }, [])
  // console.log(streamList);
  return (
    <div className="view">
      <button className="view-btn">Random Stream</button>
      <div className="catelog">
        {
          streamList.map((stream) => {
            // console.log(stream);
            var url = 'https://twitch.tv/' + stream.user_login;

            return <StreamCard key={stream.id} url={url} stream={stream} />
          })
        }
      </div>
    </div >
  )
}

export default Stream_Catelog;