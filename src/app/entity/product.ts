// // src/app/entity/product.ts

// export enum Sexe {
//     MALE = 'MALE',
//     FEMALE = 'FEMALE',
//     UNISEX = 'UNISEX'
//   }
  
//   export class Product {
//     constructor(
//       public id: string,
//       public name: string,
//       public description: string,
//       public availableQuantity: number,
//       public price: number,
//       public imageUrl: string,
//       public sexe: Sexe,
//       public brand: string
//     ) {}
//   }
  // src/app/models/product.model.ts

import { Brand } from './brand';

export enum Sexe {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNISEX = 'UNISEX'
}

export class Product {
  id: number;
  name: string;
  description: string;
  reference: string;
  availableQuantity: number;
  price: number;
  imageUrl: string;
  sexe: Sexe;
  brand: Brand;

  constructor(id: number, name: string, description: string, reference: string, 
              availableQuantity: number, price: number, imageUrl: string, 
              sexe: Sexe, brand: Brand) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.reference = reference;
    this.availableQuantity = availableQuantity;
    this.price = price;
    this.imageUrl = imageUrl;
    this.sexe = sexe;
    this.brand = brand;
  }
}
