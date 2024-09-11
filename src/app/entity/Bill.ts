export interface BillRequest {
  phone: string;
  clientId: number;
  orderId: number;
  amount: number;  // Assuming BigDecimal is used for monetary values, number in TypeScript is sufficient
}
export interface BillResponse {
  id: number;
  totalAmount: number;  // Again, number is used for monetary values in TypeScript
  clientId: number;
  orderId: number;
}
