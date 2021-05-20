const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const path = require('path');

const port = 3000;

const CLIENT_ID = 'kvd9pqyzzv86sc9brklfdlt9sh4rdu';
const CLIENT_SECRET = 'nirb8mdzt7i8wvsk7jos9ugftms67g';

app.use(express.static(path.join(__dirname, '..')));

var pages = {
  'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yT0M0eE1URTNNall5TXpZMU5UVTJOeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJNQzQ1TWpVNE1qRXdNVE0xTmpFMU1qUXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19': 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yT0M0eE1URTNNall5TXpZMU5UVTJOeXdpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJNQzQ1TWpVNE1qRXdNVE0xTmpFMU1qUXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19',

  'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTlM0ek5qRTBPVGN4TURZek5EYzFPQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJNaTQxTXpZME9UVXlOVGs1TVRnd016UXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19': 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTlM0ek5qRTBPVGN4TURZek5EYzFPQ3dpWkNJNlptRnNjMlVzSW5RaU9uUnlkV1Y5In0sImEiOnsiQ3Vyc29yIjoiZXlKeklqbzJNaTQxTXpZME9UVXlOVGs1TVRnd016UXNJbVFpT21aaGJITmxMQ0owSWpwMGNuVmxmUT09In19',

  'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTVM0eE1ESTFPVFUwT0RjNE5qWXlNalVzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam8xT1M0MU5EUXpOalkzTmpJME5qUTJMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In19': 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam8yTVM0eE1ESTFPVFUwT0RjNE5qWXlNalVzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6ImV5SnpJam8xT1M0MU5EUXpOalkzTmpJME5qUTJMQ0prSWpwbVlXeHpaU3dpZENJNmRISjFaWDA9In19'
}

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
    const auth = {
      Authorization: 'Bearer ' + data.data.access_token,
      'Client-Id': CLIENT_ID
    }
    var pageKey = Object.keys(pages);
    var pageKeyLength = pageKey.length;
    var randKey = Math.floor(Math.random() * pageKeyLength - 1);
    randKey = randKey < 0 ? 0 : randKey;

    axios.get(`https://api.twitch.tv/helix/streams?first=20&after=${pageKey[randKey]}`, {
      headers: auth
    })
      .then(data => {
        if (!pages[data.data.pagination.cursor]) {
          pages[data.data.pagination.cursor] = data.data.pagination.cursor;
        }
        res.json(data.data);
        return;
      })
      .catch(err => console.log(err))
  })
    .catch(err => console.log('ERROR', err));
})

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});