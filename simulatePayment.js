const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const sendPayment = async () => {
  await producer.connect();

  const paymentEvent = {
    orderId: "order-123",
    status: "success",
    amount: 150,
    itemId: "item-1",
  };

  await producer.send({
    topic: "payments",
    messages: [
      {
        value: JSON.stringify(paymentEvent),
      },
    ],
  });

  console.log("Message sent successfully");

  await producer.disconnect();
};

sendPayment().catch(console.error);