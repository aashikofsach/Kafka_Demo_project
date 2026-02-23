class PaymentEvent
{
    constructor(orderId , status , amount)
    {
        this.order = orderId ;
        this.status = status ;
        this.amount = amount ;

    }
}