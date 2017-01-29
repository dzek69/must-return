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

    describe("when used as a function [ x.must.return(y) ] and ", () => {
        describe("when used without negation and", function() {
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

            describe("when actual value is a function", function() {
                const returnString = function() {
                    const fn = function() {
                        return "abcd";
                    };
                    fn.must.return("abcd");
                };

                const returnNumber = function() {
                    const fn = function() {
                        return 56;
                    };
                    fn.must.return(56);
                };

                const returnBoolean = function() {
                    const fn = function() {
                        return true;
                    };
                    fn.must.return(true);
                };

                const returnUndefined = function() {
                    const fn = function() {
                        return undefined;
                    };
                    fn.must.return(undefined);
                };

                const returnWrongString = function() {
                    const fn = function() {
                        return "dcba";
                    };
                    fn.must.return("abcd");
                };

                const returnWrongNumber = function() {
                    const fn = function() {
                        return 65;
                    };
                    fn.must.return(56);
                };

                const returnWrongBoolean = function() {
                    const fn = function() {
                        return true;
                    };
                    fn.must.return(false);
                };

                const returnNullInsteadOfUndefined = function() {
                    const fn = function() {
                        return null;
                    };
                    fn.must.return(undefined);
                };

                const returnObject = function() {
                    const fn = function() {
                        return { hi: "there" };
                    };
                    fn.must.return({ hi: "there" });
                };

                it("does not throw when return value is equal to expected value", function() {
                    returnString.must.not.throw();
                    returnNumber.must.not.throw();
                    returnBoolean.must.not.throw();
                    returnUndefined.must.not.throw();
                });

                it("does throw when references aren't equal", function() {
                    returnObject.must.throw(must.AssertionError);
                });

                it("does throw when returned value is different", function() {
                    returnWrongString.must.throw(must.AssertionError);
                    returnWrongNumber.must.throw(must.AssertionError);
                    returnWrongBoolean.must.throw(must.AssertionError);
                    returnNullInsteadOfUndefined.must.throw(must.AssertionError);
                });

                it("throws meaningful information", function() {
                    try {
                        returnWrongString();
                    }
                    catch (e) {
                        const { message, actual, expected } = e;
                        actual.must.equal("dcba");
                        expected.must.equal("abcd");
                        message.must.match(/^function \(\) {\n.*\n\s*} must return "abcd"$/);
                    }

                    try {
                        returnWrongNumber();
                    }
                    catch (e) {
                        const { message, actual, expected } = e;
                        actual.must.equal(65);
                        expected.must.equal(56);
                        message.must.match(/^function \(\) {\n.*\n\s*} must return 56$/);
                    }

                    try {
                        returnWrongBoolean();
                    }
                    catch (e) {
                        const { message, actual, expected } = e;
                        actual.must.equal(true);
                        expected.must.equal(false);
                        message.must.match(/^function \(\) {\n.*\n\s*} must return false$/);
                    }

                    try {
                        returnNullInsteadOfUndefined();
                    }
                    catch (e) {
                        const { message, actual, expected } = e;
                        must(actual).equal(null);
                        must(expected).equal(undefined);
                        message.must.match(/^function \(\) {\n.*\n\s*} must return undefined$/);
                    }

                    try {
                        returnObject();
                    }
                    catch (e) {
                        const { message, actual, expected } = e;
                        actual.must.eql({ hi: "there" });
                        expected.must.eql({ hi: "there" });
                        message.must.match(/^function \(\) {\n.*\n\s*} must return {"hi":"there"}$/);
                    }
                })
            });
        });

        describe("when used with negation", function() {

        });
    });



    describe("when `not` is used", function() {
        it("works on non-functions", () => {
            "600".must.not.return(600);
            (600).must.not.return(600);
            true.must.not.return(600);
            Promise.resolve(600).must.not.return(600);
        });

        it("works on functions that returns something else", () => {
            const fn = function() {
                return 599;
            };
            fn.must.not.return(600);
        });
    });
});
