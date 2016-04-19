var Twitter = require('twitter');

module.exports.process = function streamTweets(cfg) {
  console.log('Starting streaming with cfg=%j', cfg);
  var client = new Twitter({
    consumer_key: cfg.consumerKey,
    consumer_secret: cfg.consumerSecret,
    access_token_key: cfg.accessTokenKey,
    access_token_secret: cfg.accessTokenSecret
  });

  // /**
  //  * Stream statuses filtered by keyword
  //  * number of tweets per second depends on topic popularity
  //  **/
  // client.stream('statuses/sample', cfg.languages , function(stream){
  //   stream.on('data', function(tweet) {
  //     console.log('%j',tweet);
  //   });
  //
  //   stream.on('error', function(error) {
  //     console.log(error);
  //   });
  // });
  this.emit('end');
};
