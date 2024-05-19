const app = require("./src/app");
const PORT = process.env.PORT || 3000;

//create a basic express endpoint
// var express = require("express");
// var app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
