const must = require("must");

must.prototype.return = function(expected) {
    this.assert(typeof this.actual === "function", "be a", {
        actual: typeof this.actual,
        expected: "function",
    });
    const result = this.actual();
    this.assert(result === expected, "return", {
        actual: result,
        expected: expected,
    });
};
