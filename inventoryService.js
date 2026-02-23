const consumer = require("./kafkaConsumer");

let inventory = {
  "item-1": 150,
  "item-2": 100,
};

const updateInventory = (PaymentEvent) => {
  const quantityToReduce = 1;
  if (inventory["item-1"] && PaymentEvent.status === "sucsess")
    inventory["item-1"] -= quantityToReduce;
  else if (inventory["item-1"] && PaymentEvent.status !== "sucsess") {
    console.log("payment failed, inventory not get updated ");
  }
};

consumer.on("message", (message) => {
  try {
    const paymentEvent = JSON.parse(message.value);
    updateInventory(paymentEvent);
  } catch (err) {
    console.log("error processing message", err);
  }
});
