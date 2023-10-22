export class OrderCreatedAdapter {
  orderId: string;
  stockId: string;
  userId: string;
  count: number;

  constructor({
    orderId,
    stockId,
    userId,
    count,
  }: {
    orderId: string;
    stockId: string;
    userId: string;
    count: number;
  }) {
    this.orderId = orderId;
    this.stockId = stockId;
    this.userId = userId;
    this.count = count;
  }
}
