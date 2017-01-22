const must = require("must");

must.prototype.return = function() {
    this.assert(typeof this.actual === "function", "be a", {
        actual: typeof this.actual,
        expected: "function",
    });
};
