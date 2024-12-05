const socket = io('https://twitterclone-uxyo.onrender.com'); // Connect to the WebSocket server

// Handle tweet posting
document.getElementById('postTweet').addEventListener('click', () => {
  const tweetInput = document.getElementById('tweetInput');
  const tweetContent = tweetInput.value.trim();

  if (tweetContent) {
    const timestamp = new Date().toLocaleTimeString();
    socket.emit('newTweet', { content: tweetContent, timestamp }); // Emit tweet
    tweetInput.value = ''; // Clear input
  }
});

// Display new tweets
socket.on('updateTweets', (tweet) => {
  const tweetList = document.getElementById('tweetList');

  const tweetDiv = document.createElement('div');
  tweetDiv.className = 'tweet';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  contentDiv.textContent = tweet.content;

  const timestampDiv = document.createElement('div');
  timestampDiv.className = 'timestamp';
  timestampDiv.textContent = tweet.timestamp;

  tweetDiv.appendChild(contentDiv);
  tweetDiv.appendChild(timestampDiv);
  tweetList.prepend(tweetDiv); // Add tweet to the top
});
