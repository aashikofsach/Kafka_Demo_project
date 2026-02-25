const consumer = require("./kafkaConsumer");

let inventory = {
  "item-1": 150,
  "item-2": 100,
};

const updateInventory = (PaymentEvent) => {
  const item = PaymentEvent.itemId;
  const quantityToReduce = 1;
  if (inventory[item] && PaymentEvent.status === "success") {
    inventory[item] -= quantityToReduce;
    console.log("updated inventory", inventory[item]);
  } else if (inventory[item] && PaymentEvent.status !== "sucsess") {
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

consumer.on("error", (err)=>{
  console.log("kafka consumer error :" , err)
})
