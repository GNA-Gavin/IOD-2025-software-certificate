const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3012;
const fakeStoreApiRoutes = require('./routes/FakeStoreApiRoutes');

swaggerDocument = require("./swagger.json");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", express.static("public"));

app.use('/fakestoreapi', fakeStoreApiRoutes);


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
