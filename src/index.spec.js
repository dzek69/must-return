const must = require("must");

const register = function() {
    require("./index");
};

describe("must-return", function() {
    describe("registers", function() {
        it("a `return` method on `must`", function() {
            (must.prototype.return === undefined).must.equal(true);
            register();
            must.prototype.return.must.be.a.function();
        });
    });

    describe("when actual value is not a function", function() {
        const stringAssertion = function() {
            "string".must.return("hi there!");
        };
        const booleanAssertion = function() {
            false.must.return("hi there!");
        };
        const NaNAssertion = function() {
            NaN.must.return("hi there!");
        };
        const numberAssertion = function() {
            (69.666).must.return("hi there!");
        };
        const objectAssertion = function() {
            ({}).must.return("hi there!");
        };
        const undefinedAssertion = function() {
            must(undefined).return("hi there!");
        };

        it("throws", function() {
            stringAssertion.must.throw(must.AssertionError);
            booleanAssertion.must.throw(must.AssertionError);
            NaNAssertion.must.throw(must.AssertionError);
            numberAssertion.must.throw(must.AssertionError);
            objectAssertion.must.throw(must.AssertionError);
            undefinedAssertion.must.throw(must.AssertionError);
        });

        it("throws meaningful information", function() {
            try {
                stringAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("string");
                expected.must.equal("function");
                message.must.equal("\"string\" must be a \"function\"");
            }

            try {
                booleanAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("boolean");
                expected.must.equal("function");
                message.must.equal("false must be a \"function\"");
            }

            try {
                NaNAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("number");
                expected.must.equal("function");
                message.must.equal("NaN must be a \"function\"");
            }

            try {
                numberAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("number");
                expected.must.equal("function");
                message.must.equal("69.666 must be a \"function\"");
            }

            try {
                objectAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("object");
                expected.must.equal("function");
                message.must.equal("{} must be a \"function\"");
            }

            try {
                undefinedAssertion();
            }
            catch (e) {
                const { message, actual, expected } = e;
                actual.must.equal("undefined");
                expected.must.equal("function");
                message.must.equal("undefined must be a \"function\"");
            }
        });
    });
});
