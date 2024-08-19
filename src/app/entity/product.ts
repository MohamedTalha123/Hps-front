export interface Product {
  id: number;
  name: string;
  description: string;
  reference: string;
  availableQuantity: number;
  price: number;
  imageUrl: string;
  sexe: Sexe;
  brandId: number;
  brandName: string;
  brandDescription: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  availableQuantity: number;
  price: number;
  imageUrl: string;
  sexe: Sexe;
  brandId: number;
}

export interface ProductResponse {
  id: number;
  description: string;
  reference: string;
  name: string;
  availableQuantity: number;
  price: number;
  imageUrl: string;
  sexe: Sexe;
  brandId: number;
  brandName: string;
  brandDescription: string;
}

export enum Sexe {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNISEX = 'UNISEX'
}