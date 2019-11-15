var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

AWS.config.region = process.env.REGION;

var docClient = new AWS.DynamoDB.DocumentClient();
var ddbTable = process.env.STARTUP_SIGNUP_TABLE;

exports.hasMutation = (req, res, next) => {
  let info = req.body.dna;

  result = hasMutation(info);
  console.log(result);
  let dna = "";

  for (let i = 0; i < info.length; i++) {
    dna += info[i];
  }

  var params = {
    TableName: "adnchains",
    Item: {
      adn: dna,
      result: result
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else {
      if (result) {
        res.status(200).json({
          hasMutation: result
        });
      } else {
        res.status(403).json({
          hasMutation: result
        });
      }
    }
  });

  //   res.status(200).json(true);
};

function hasMutation(dna) {
  let stringCol = "";
  let stringDiagonalRightUp = "";
  let stringDiagonalRightDown = "";

  let stringDiagonalLeftUp = "";
  let stringDiagonalLeftDown = "";

  for (let i = 0; i < dna.length; i++) {
    // Evaluacion de las filas de la matriz
    if (evaluation(dna[i])) return true;

    // Obtener las columnas y las diagonales de la matriz

    for (let index = 0; index < dna.length; index++) {
      stringCol += dna[index].toString()[i];
      stringDiagonalRightUp += dna[index].toString()[index + i]
        ? dna[index].toString()[index + i]
        : "";
      stringDiagonalRightDown += dna[index].toString()[index - i]
        ? dna[index].toString()[index - i]
        : "";

      stringDiagonalLeftUp += dna[dna.length - 1 - index].toString()[index + i]
        ? dna[dna.length - 1 - index].toString()[index + i]
        : "";

      stringDiagonalLeftDown += dna[dna.length - 1 - index].toString()[
        index - i
      ]
        ? dna[dna.length - 1 - index].toString()[index - i]
        : "";
    }

    // Evaluaciones de cada diagonal y columna de la matriz
    if (evaluation(stringCol)) return true;

    if (evaluation(stringDiagonalRightUp)) return true;

    if (evaluation(stringDiagonalRightDown)) return true;

    if (evaluation(stringDiagonalLeftUp)) return true;

    if (evaluation(stringDiagonalLeftDown)) return true;

    stringCol = "";
    stringDiagonalRight = "";
    stringDiagonalLeft = "";
    stringDiagonalLeftUp = "";
    stringDiagonalLeftDown = "";
  }

  return false;
}

function evaluation(dnaLink) {
  // REGEX mas de 4 caracteres consecutivos
  return /(.)\1{3,}/.test(dnaLink);
}
