export interface Order {
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
  