import { ProductResponse } from './product'; // Assuming ProductResponse is in the same file as Product

export interface CartItem {
  product: ProductResponse;
  quantity: number;
}
