const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const path = require('path');

const port = 3000;

const CLIENT_ID = 'kvd9pqyzzv86sc9brklfdlt9sh4rdu';
const CLIENT_SECRET = 'nirb8mdzt7i8wvsk7jos9ugftms67g';

app.use(express.static(path.join(__dirname, '..')));

// curl -X GET 'https://api.twitch.tv/helix/games?id=493057' \
// -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
// -H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2'

app.get('/game/:game_title', (req, res) => {
  // console.log(req.params);
  axios.post(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`).then(res => {
    // console.log(res.data)
    const auth = {
      Authorization: 'Bearer ' + res.data.access_token,
      'Client-Id': CLIENT_ID
    }
    axios.get(`https://api.twitch.tv/helix/games?name=${req.params.game_title}`, {
      headers: auth
    })
      .then(res => {
        // console.log(res.data);
        axios.get(`https://api.twitch.tv/helix/streams?game_id=${res.data.data[0].id}`, {
          headers: auth
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err);
      })
  })
    // .then(data => console.log('RESPONSE', data.data))
    .catch(err => console.log('ERROR', err));
  res.sendStatus(200);
})

app.get('/random', (req, res) => {
  // console.log(req.params);
  axios.post(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`).then(data => {
    // console.log(res.data)
    const auth = {
      Authorization: 'Bearer ' + data.data.access_token,
      'Client-Id': CLIENT_ID
      // 'Client-Id': CLIENT_ID
    }
    axios.get(`https://api.twitch.tv/helix/streams`, {
      headers: auth
    })
      .then(data => {
        res.json(data.data);
        return;
      })
      .catch(err => console.log(err))
    // axios.get('https://api.twitch.tv/helix/beta/streams/random', {
    //   headers: auth
    // })
    //   .then(data => {
    //     res.json(data.data);
    //     return;
    //   })
    //   .catch(err => console.log(err))
  })
    // .then(data => console.log('RESPONSE', data.data))
    .catch(err => console.log('ERROR', err));
})

app.get('/thumbnail', (req, res) => {
  // https://api.twitch.tv/helix/streams?user_login=username

})
app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});