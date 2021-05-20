import React from 'react';

const ChannelList = (props) => {


  return (
    <div className="channel-list">
      {
        props.list.map((user_name) => {
          return <button key={user_name} className="channel-list-btn" onClick={() => {
            props.changeStream(user_name, null);
          }}>{user_name}</button>
        })
      }

    </div>
  )
}

export default ChannelList;