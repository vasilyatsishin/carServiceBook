import api from "../api/apiConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type { CatalogItem, CatalogItemCreate } from "../interfaces/Catalog/CatalogInterface";

export const getCatalog = async (): Promise<CatalogItem[]> => {
  const res = await api.get<CatalogItem[]>(API_CONSTANTS.SERVICES_CATALOG.GET);
  return res.data;
};

export const createCatalogItem = async (item: CatalogItemCreate): Promise<CatalogItem> => {
  const res = await api.post<CatalogItem>(API_CONSTANTS.SERVICES_CATALOG.CREATE, item);
  return res.data;
};

export const updateCatalogItem = async (id: number, item: CatalogItemCreate): Promise<CatalogItem> => {
  const res = await api.put<CatalogItem>(API_CONSTANTS.SERVICES_CATALOG.UPDATE(id), item);
  return res.data;
};

export const deleteCatalogItem = async (id: number): Promise<void> => {
  await api.delete(API_CONSTANTS.SERVICES_CATALOG.DELETE(id));
};
