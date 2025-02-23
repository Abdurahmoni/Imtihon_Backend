export class CreateOrderItemDto {
  readonly order_id: number;
  readonly product_id: number;
  readonly quantity: number;
  readonly total_price: number;
  readonly seller_id: number;
  readonly store_id: number;
  readonly status: string;
}
