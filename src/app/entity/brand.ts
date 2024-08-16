export class Brand {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public imageURL: string,
      public products?: any[]
    ) {}
  
    getImageUrl(): string {
      return this.imageURL || 'path/to/default/image.jpg';
    }
  }
  