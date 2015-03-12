
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

var command = function (req, res, next) {
  if (req.body.token != 'g293qg6vKzBj1fidXNoaXLSL') {
    res.sendStatus(403);
    return;
  }

  var idx = Math.floor((Math.random() * locations.length));
  res.status(200).send(locations[idx]);
};


module.exports = command;
