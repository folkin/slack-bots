
var debug = require('debug')('slack:lunch-bot');
var moment = require('moment-timezone');
var later = require('later');
var Slack = require('../lib/slack-client/index');

var token = 'xoxb-4005972345-TmRrnEpJXjzSOP1hPAJR5iiv';
var autoReconnect = true;
var autoMark = true;

var bot = {
  'slack': new Slack(token, autoReconnect, autoMark)
}

bot.slack.on('open', function() {
  var channel, channels, group, groups, id, messages, unreads;
  channels = [];
  groups = [];
  unreads = bot.slack.getUnreadCount();
  channels = (function() {
    var ref, results;
    ref = bot.slack.channels;
    results = [];
    for (id in ref) {
      channel = ref[id];
      if (channel.is_member) {
        results.push("#" + channel.name + '(' + id + ')');
      }
    }
    return results;
  })();
  groups = (function() {
    var ref, results;
    ref = bot.slack.groups;
    results = [];
    for (id in ref) {
      group = ref[id];
      if (group.is_open && !group.is_archived) {
        results.push(group.name);
      }
    }
    return results;
  })();
  console.log("Welcome to Slack. You are @" + bot.slack.self.name + " of " + bot.slack.team.name);
  console.log('You are in: ' + channels.join(', '));
  console.log('As well as: ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  console.log("You have " + unreads + " unread " + messages);
});

bot.slack.on('message', function(message) {
  var channel;
  var channelError;
  var channelName;
  var errors;
  var response;
  var text;
  var textError;
  var ts;
  var type;
  var typeError;
  var user;
  var userName;
  channel = bot.slack.getChannelGroupOrDMByID(message.channel);
  user = bot.slack.getUserByID(message.user);
  response = '';
  type = message.type;
  ts = message.ts;
  text = message.text;
  channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
  console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
  if (type === 'message' && (text != null) && (channel != null)) {
    response = text.split('').reverse().join('');
    channel.send(response);
    console.log("@" + bot.slack.self.name + " responded with \"" + response + "\"");
  } else {
    typeError = type !== 'message' ? "unexpected type " + type + "." : null;
    textError = text == null ? 'text was undefined.' : null;
    channelError = channel == null ? 'channel was undefined.' : null;
    errors = [typeError, textError, channelError].filter(function(element) {
      return element !== null;
    }).join(' ');
    console.log("@" + bot.slack.self.name + " could not respond. " + errors);
  }
});

bot.slack.on('error', function(error) {
  console.log("Error: " + error);
});


bot.login = function () {
  bot.slack.login();
  setTimeout(function () { scheduleNextMessage(bot) }, 5000);
}

function scheduleNextMessage(bot) {
  var utcOffset = moment().tz("EST").utcOffset();
  var nextcheck = moment().hour(13).minute(23).second(0);
  if (utcOffset > 0)
      nextcheck = nextcheck.add(utcOffset, 'm');
  else
      nextcheck = nextcheck.subtract(utcOffset, 'm');
  var schedule = later.parse.text('at ' + nextcheck.format('HH:mm a'));
  later.setTimeout(sendSuggestion(bot), schedule);
}

function sendSuggestion(bot) {
  var idx = Math.floor((Math.random() * locations.length));
  var channel = bot.slack.getChannelGroupOrDMByID('C03UPHZSD');
  channel.send('You guys should eat at: ' + locations[idx] + ' today!');
}


var locations = [
  'Best Taste',
  'Bloomington Sandwich Company',
  'Bloomingfoods Market and Deli',
  'Brother\'s Bar & Grill',
  'Bub\'s Burgers and Ice Cream',
  'BuffaLouie\'s',
  'Cafe Pizzaria',
  'Chipotle',
  'Crazy Horse',
  'Darn Good Soup',
  'Dats',
  'El Norteno',
  'Trailhead Pizza',
  'Irish Lion',
  'Kilroy\s',
  'Opie Taylors',
  'Penn Station',
  'Potbelly Sandwich Shop',
  'Qdoba Mexican Grill',
  'Runcible Spoon',
  'Subway',
  'Taste of India',
  'Trojan Horse',
  'Village Deli',
  'Wich Wich Sandwiches',
  'Z & C Teriyaki & Sushi'
];


module.exports = exports = bot;
