var Twitter = require('twitter');
var elasticio = require('elasticio-node');
var messages = elasticio.messages;


module.exports.process = function streamTweets(msg,cfg) {
  var that = this;
  console.log('Starting streaming with cfg=%j', cfg);
  var client = new Twitter({
    consumer_key: cfg.consumerKey,
    consumer_secret: cfg.consumerSecret,
    access_token_key: cfg.accessTokenKey,
    access_token_secret: cfg.accessTokenSecret
  });

  /**
   * Stream statuses filtered by keyword
   * number of tweets per second depends on topic popularity
   **/
  client.stream('statuses/sample', cfg.languages , function(stream){
    stream.on('data', function(tweet) {
      console.log("Have got a tweet message=%s", tweet.message);
      that.emit('data', messages.newMessageWithBody(tweet));
    });

    stream.on('error', function(error) {
      that.emit('error', error);
      console.log(error);
      that.emit('end');
      process.exit(-1);
    });

    setTimeout(function shutdown() {
      console.log('60 Seconds are now processed, we will shutdown');
      stream.destroy();
      that.emit('end');
    }, 60000);

  });
};
