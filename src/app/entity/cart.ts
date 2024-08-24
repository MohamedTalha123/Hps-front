import { ProductResponse } from './product'; 
export interface CartItem {
  product: ProductResponse;
  quantity: number;
}
