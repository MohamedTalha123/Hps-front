export interface Order {
    orderLineItems: any;
    id: number;
    reference: string;
    totalAmount: number; 
    userId: number;
    createdAt: string; 
    lastModifiedDate: string; 
  }
  
export interface OrderRequest {
    product_id: number;
    quantity: number;
    user_id: number;
  }
  export interface OrderLineResponse {
    id: number;
    orderId: number;
    productReference: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  