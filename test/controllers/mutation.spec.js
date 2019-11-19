var mutationController = require("../../controllers/mutation");
var chai = require("chai");
chai.should();

describe("Mutation Controller", function() {
  describe("hasMutation Function", function() {
    var res = {
      status: function(args) {
        return {
          json: function(obj) {
            return obj;
          }
        };
      }
    };

    it("Should return true if has No Mutation Col Mutation", function(done) {
      var req = {
        body: {
          dna: ["ATGCGA", "ATGTGC", "ATATTT", "AAACGG", "GCGTCA", "TCACTG"]
        }
      };
      mutationController.hasMutation(req, res, function(result) {
        result.should.be.true;
        done();
      });
    });

    it("Should return true if has No Mutation Row Mutation", function(done) {
      var req = {
        body: {
          dna: ["AAAAGA", "ATGTGC", "ATATTT", "TAACGG", "GCGTCA", "TCACTG"]
        }
      };
      mutationController.hasMutation(req, res, function(result) {
        result.should.be.true;
        done();
      });
    });

    it("Should return true if has No Mutation back \\ Diagonal Mutation", function(done) {
      var req = {
        body: {
          dna: ["AAATGA", "AAGTGC", "ATATTT", "TAAAGG", "GCGTCA", "TCACTG"]
        }
      };
      mutationController.hasMutation(req, res, function(result) {
        result.should.be.true;
        done();
      });
    });

    it("Should return true if has No Mutation forward / Diagonal Mutation", function(done) {
      var req = {
        body: {
          dna: ["AAATGA", "AGGTAC", "ATCATT", "TAAAGG", "GCGTCA", "TCACTG"]
        }
      };
      mutationController.hasMutation(req, res, function(result) {
        result.should.be.true;
        done();
      });
    });

    it("Should return false if has No Mutation", function(done) {
      var req = {
        body: {
          dna: ["ATGCGA", "ATGTGC", "ATATTT", "TAACGG", "GCGTCA", "TCACTG"]
        }
      };
      this.timeout(10000);
      mutationController.hasMutation(req, res, function(result) {
        result.should.be.false;
        done();
      });
    });
  });
});
