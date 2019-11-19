var statsController = require("../../controllers/stats");
var chai = require("chai");
chai.should();

describe("Stats Controller", function() {
  describe("getStats Function", function() {
    var res = {
      status: function(args) {
        return {
          json: function(obj) {
            return obj;
          }
        };
      }
    };

    it("Should return the stats object", function(done) {
      var req = {};
      statsController.getStats(req, res, function(result) {
        result.should.have.property("count_no_mutation");
        result.should.have.property("count_mutations");
        result.should.have.property("ratio");
        done();
      });
    });

    it("Should return error", function(done) {
      var req = {};
      statsController.getStats();
    });
  });
});
