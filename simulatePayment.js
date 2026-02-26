const {kafka} = require('kafkajs');

const kafka = new kafka({
  brokers : ["localhost:9092"],
  clientId : "payment-service"
}) ;

const producer = kafka.Producer() ;

const sendPayment = async () => {
  await producer.connect() ;

  const paymentEvent = {
    orderId : "order-123",
    status  : "success",
    amount : "150",
    itemId : "item-123"
  }

  await producer.send({
    topic : "payments",
    message : [{
      value : JSON.stringify(paymentEvent)
    }]
  });

  console.log("message send successfully");
}

sendPayment().catch(console.error) // here as aysnc function return promise but actually nothing is returning but in case if error comes then catch we handle the error from async function