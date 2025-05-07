const express = require("express");
const cors = require("cors");
const routes = require("./routes/myapproutes");
const calculatorRoutes = require("./routes/calculatorroutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const app2 = express();
const port = 3000;
const port2 = 3001;

app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use("/", express.static("public"));
app.use("/users", userRoutes);

// map the calculator routes to our app
app.use("/calculator", calculatorRoutes);

app2.get("/", (req, res) => {
  res.send("Welcome to my second application");
});

app2.get("/users", (req, res) => {
  res.send("Here is a list of users");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app2.listen(port2, () => {
  console.log(`Another Server listening on port: ${port2}`);
});
