export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CatalogItemCreate {
  name: string;
  description: string;
  price: number;
}
