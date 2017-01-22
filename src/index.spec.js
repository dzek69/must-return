const must = require("must");

const register = function() {
    require("./index");
};

describe("must-return", function() {
    it("registers a `return` method on `must`", function() {
        (must.prototype.return === undefined).must.equal(true);
        register();
        must.prototype.return.must.exist();
    });
});
