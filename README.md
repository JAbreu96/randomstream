

Randomize Twitch Stream
------------
Twitch Fans who want to discover new streamers
------------------
Randomize twitch stream is exactly how it sounds, click the random stream button to generate a new stream to watch.
If your tired watching the same old streamer, or just want to give love to other streams you can click randomize!
Your are also able chat as you would fans in twitch.tv
------------------------
Potentially help promote streams to gain more recognition for their hardwork!
---------------------------
If you love twitch, then you would love this randomize tool!
------------------------------
How to get started;
1. Install dependencies with:
  npm install
2. Run server with
  npm start
3. Run react with
  npm run build
4. Use localhost:3000 to view application!
-----------------------------------
How to use the application!

1. On browser lookup: localhost:3000 (If cloned on Local Machine)
2. Click random stream button
3. No Sound? Click on Sound setting in video player
4. You can chat with Twitch commuinity!
----------------

https://user-images.githubusercontent.com/67124370/122264353-71da7500-cea5-11eb-8944-2f941dbd59e7.mp4
-----------------------------------

5. You can choose a stream from the catelog below!
----------------
https://user-images.githubusercontent.com/67124370/122264416-83238180-cea5-11eb-9677-57681a420140.mp4
-----------------------------------

6. You can generate a new list
7. The list above the Stream keeps track of streams you have visited!
----------------
https://user-images.githubusercontent.com/67124370/122264442-8ae32600-cea5-11eb-9e02-004be4159917.mp4
-----------------------------------

Technologies:
· React.js
· CSS3
· HTML
· Twitch API
· Axios
· Node.js
· Express
· Webpack

Interesting Findings:
--------------------
· Twitch API was interesting to work with. They released this API near the beginning of 2021. Any previous APi has been depracated. The API has no random stream capabilities, so I had to create a solution. What's interesting about the API is the pagination key needed to dive deeper into list of streams. I figured a good point to generate a list is where the average amount of viewers is below 100. I copied a pagination key that represents this area and used as a starting point. Everytime a user would generate a new list, the list can go deeper into more niche streams. Either way, this area of the stream is highly volatile (changes every time a new list is generated), a unique list is almost given.

· I set up a cache system that saves recently visited streams. It works for a local machine only. It only caches a maximum amount of eleven streams.

· The randomize stream button is not truly random. It is only able to choose a random stream from the generated catalog.

Work to be done:

QUALITY OF APPLICATION

· Figure a way to truly randomize a stream.
· Personally embed a Twitch stream.
· Cache System does persist after reload, perhaps use IndexDb to achieve browser specific cache

NEW FEATURES:

· Random stream by games
· Random stream by tags
