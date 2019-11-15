var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

AWS.config.region = process.env.REGION;

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getStats = (req, res, next) => {
  var params = {
      TableName: "adnchains"
    },
    count_mutations = 0,
    count_no_mutation = 0,
    ratio = 0;

  docClient.scan(params, function(err, data) {
    if (err) {
      res.status(500).json({ err: err });
    } else {
      let adnchains = data.Items;

      for (let index = 0; index < adnchains.length; index++) {
        if (adnchains[index].result) {
          count_mutations++;
        } else {
          count_no_mutation++;
        }
      }

      ratio = count_mutations / count_no_mutation;
      res.status(200).json({
        count_mutations: count_mutations,
        count_no_mutation: count_no_mutation,
        ratio: ratio.toFixed(2)
      });
    }
  });
};
