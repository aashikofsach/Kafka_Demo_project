const kafka = require("kafka-node");

const Producer = kafka.Producer;

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const producer = new Producer(client);

producer.on("ready", () => {
  const paymentEvent = JSON.stringify({
    orderId: "order-123",
    status: "sucsess",
    amount: 150.0,
    itemId : "item-123"
  });

  const payloads = [{ topic: "payments", message: paymentEvent }];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error("Error sending message", err);
    } else {
      console.log("Message send Sucessfully", data);
    }
  });
});

producer.on("error", (err) => {
  console.log("Error with kafka producer", err);
});
