const express = require("express");
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorroutes');
const app = express();
const port = 3008;

app.use(cors());

// app.use("/", calculatorRoutes);
app.use("/", express.static("public")); 

// map the calculator routes to our app
app.use('/calculator', calculatorRoutes);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});