const add = (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  let result = num1 + num2;

  res.json({ res: result });
};

const subtract = (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  let result = num1 - num2;

  res.json({ res: result });
};

const multiply = (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  let result = num1 * num2;

  res.json({ res: result });
};

const divide = (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  // Check for division by zero
  if (num2 === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }

  let result = num1 / num2;

  res.json({ res: result });
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
