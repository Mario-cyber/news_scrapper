// Creating am object that includes both our databases so we can reference them under a single file 
module.exports = {
    News: require("./News"),
    Comments: require("./Comments")
};