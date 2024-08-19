export interface Brand {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface BrandRequest {
  name: string;
  description: string;
  imageUrl: string;
}

export interface BrandResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
