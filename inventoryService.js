const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "inventory-group",
});

let inventory = {
  "item-1": 150,
  "item-2": 100,
};

const updateInventory = (paymentEvent) => {
  const item = paymentEvent.itemId;

  if (inventory[item] && paymentEvent.status === "success") {
    inventory[item] -= 1;
    console.log("Updated inventory:", item, inventory[item]);
  } else if (inventory[item] && paymentEvent.status !== "success") {
    console.log("Payment failed, inventory not updated");
  } else {
    console.log("Item not found in inventory");
  }
};

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "payments",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log("Received payment event:", paymentEvent);

        updateInventory(paymentEvent);
      } catch (err) {
        console.log("Error processing message:", err);
      }
    },
  });
};

runConsumer().catch(console.error);