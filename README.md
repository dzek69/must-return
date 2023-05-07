# DEPRECATED!!!

Nobody uses this thing and it has bugs! It's not recommended to use it

# must-return

Add function return value assertions to Must.js

# Install 
```
npm install must-return
```

# Usage

```javascript
require("must-return"); // This will internally require must and upgrade its prototype.

const return100 = () => {
    return 100;
};

describe("Testing must returns", () => {
    it("must be a huge success", () => {
        return100.must.return(100);
    });

    it("will fail", () => {
        return100.must.return("100");
    });
});
```

# Note

Value comparison is done with `===`, so in most cases you won't be able to test expected object return, as references
will be different. I'm still new to Must.js and I'm looking for a way to make `return` to be a pass-through, just like
`resolve`, so you will be able to do `return100.must.return.eql({})` (looking for smoother to read naming too).

Feel free to suggest something or even open a PR.

# License 

MIT
