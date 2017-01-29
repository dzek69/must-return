const must = require("must");

must.prototype.return = function(expected) {
    const isFunction = typeof this.actual === "function";
    this.assert(isFunction, "be a", {
        actual: typeof this.actual,
        expected: "function",
    });
    if (!isFunction) {
        return;
    }
    const result = this.actual();
    this.assert(result === expected, "return", {
        actual: result,
        expected: expected,
    });
};
