const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

const express = require("express");
const cors = require("cors");
// const calculatorRoutes = require('./routes/calculatorroutes');
// const app = express();
const app = require("./app");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3010;

// app.use(express.json())
app.use(cors());

// app.use("/", calculatorRoutes);
app.use("/", express.static("public"));

// map the calculator routes to our app
// app.use('/calculator', calculatorRoutes);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
