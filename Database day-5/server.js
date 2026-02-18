const test  = require("./src/test")

test.listen(3000, (req, res) => {
    console.log("Server is runing on port 3000.");
    
})