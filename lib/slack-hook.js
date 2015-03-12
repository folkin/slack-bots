
var debug = require('debug')('slack:hook');
var unirest = require('unirest');

var Slack = function() { };

Slack.payload = function(text, channel, sender, icon) {
    var payload = {};
    payload.text = text;
    if (channel)
      payload.channel = channel;
    if (sender)
      payload.username = sender;
    if (icon)
      payload.icon_url = icon;

    return payload;
  };

Slack.send = function (text, channel, sender, icon) {
    var body = this.payload(text, channel, sender, icon);
    unirest.post("https://hooks.slack.com/services/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")
      .header('Accept', 'application/json')
      .type('application/json')
      .send(JSON.stringify(body))
      .as.json(function(res) {
        if (!res.ok){
          debug(res.body);
        }
      });
  };

module.exports = exports = Slack;
