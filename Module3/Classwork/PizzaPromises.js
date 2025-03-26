/////////////////////////////////////////////// Task 1 /////////////////////////////////////////////////

function preparePizza() {
    console.log("Started preparing the pizza...");
}

function makeBase() {
    console.log("Made the base");
}

const addSauce = function() {
    console.log("Adding the sauce and cheese");
};

const addToppings = function() {
    console.log("Added the pizza toppings");
};

const cookPizza = () => {
    console.log("Cooked the Pizza");
};

const ready = () => {
    console.log("Pizza is ready");
};

preparePizza();
makeBase();
addSauce();
addToppings();
cookPizza();
ready();

/////////////////////////////////////////////// Task 2 /////////////////////////////////////////////////

function preparePizzaAsync() {
  setTimeout(() => {
    console.log("Started preparing the pizza...");
  }, 100);
}

function makeBaseAsync() {
  setTimeout(() => {
    console.log("Made the base");
  }, 200);
}

const addSauceAsync = function () {
  setTimeout(() => {
    console.log("Adding the sauce and cheese");
  }, 300);
};

const addToppingsAsync = function () {
  setTimeout(() => {
    console.log("Added the pizza toppings");
  }, 400);
};

const cookPizzaAsync = () => {
  setTimeout(() => {
    console.log("Cooked the Pizza");
  }, 500);
};

const readyAsync = () => {
  setTimeout(() => {
    console.log("Pizza is ready");
  }, 600);
};

preparePizzaAsync();
makeBaseAsync();
addSauceAsync();
addToppingsAsync();
cookPizzaAsync();
readyAsync();

/////////////////////////////////////////////// Task 3 /////////////////////////////////////////////////

function preparePizzaPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Started preparing the pizza...");
      resolve();
    }, 100);
  });
}

function makeBasePromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Made the base");
      resolve();
    }, 200);
  });
}

const addSaucePromise = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Adding the sauce and cheese");
      resolve();
    }, 300);
  });
};

const addToppingsPromise = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Added the pizza toppings");
      resolve();
    }, 400);
  });
};

const cookPizzaPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Cooked the Pizza");
      resolve();
    }, 500);
  });
};

const readyPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Pizza is ready");
      resolve();
    }, 600);
  });
};

preparePizzaPromise()
  .then(makeBasePromise)
  .then(addSaucePromise)
  .then(addToppingsPromise)
  .then(cookPizzaPromise)
  .then(readyPromise);

///////////////////////////////////////////////// Task 4 /////////////////////////////////////////////////

async function preparePizzaAsyncAwait() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Started preparing the pizza...");
      resolve();
    }, 100);
  });
}

async function makeBaseAsyncAwait() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Made the base");
      resolve();
    }, 200);
  });
}

const addSauceAsyncAwait = async function () {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Adding the sauce and cheese");
      resolve();
    }, 300);
  });
};

const addToppingsAsyncAwait = async function () {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Added the pizza toppings");
      resolve();
    }, 400);
  });
};

const cookPizzaAsyncAwait = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Cooked the Pizza");
      resolve();
    }, 500);
  });
};

const readyAsyncAwait = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Pizza is ready");
      resolve();
    }, 600);
  });
};

async function makePizza() {
  await preparePizzaAsyncAwait();
  await makeBaseAsyncAwait();
  await addSauceAsyncAwait();
  await addToppingsAsyncAwait();
  await cookPizzaAsyncAwait();
  await readyAsyncAwait();
}

makePizza();
