import type {
  AdminItemDetail,
  AdminListItem,
  AdminSaveItemRequest
} from "@/infrastructure/admin-items.ts";
import type { BackofficeNS } from "@/pages/backoffice/types.ts";
import { adaptCatalogFilter } from "@/infrastructure/adapters.ts";
import { furnitureName } from "@/common/consts.ts";
import { FurnitureType } from "@/types/types.ts";
import { type BackofficeItemNS } from "@/pages/backoffice/components/backoffice-item/types.ts";

export const emptyForm = (): BackofficeNS.Form => ({
  title: "",
  article: "",
  types: [],
  coverImage: "",
  images: [],
  parameters: [""],
  price: 0,
  inStock: 0,
  sizes: []
});

export const formToDto = (form: BackofficeNS.Form): AdminSaveItemRequest => ({
  title: form.title.trim(),
  article: form.article.trim(),
  types: form.types.map(t => adaptCatalogFilter.toDto(t)),
  cover_image: form.coverImage.trim(),
  images: form.images.map(i => i.trim()).filter(Boolean),
  parameters: form.parameters.map(p => p.trim()).filter(Boolean),
  price: form.price,
  in_stock: form.inStock,
  sizes: form.sizes
    .filter(s => s.size.trim())
    .map(s => ({
      size: s.size.trim(),
      materials: s.materials
        .filter(m => m.name.trim())
        .map(m => ({
          name: m.name.trim(),
          image: m.image.trim(),
          price: m.price,
          in_stock: m.inStock
        }))
    }))
    .filter(s => s.materials.length)
});

export const detailToForm = (detail: AdminItemDetail): BackofficeNS.Form => ({
  title: detail.title || "",
  article: detail.article || "",
  types: (detail.types || []).map(t => adaptCatalogFilter.fromDto(t)),
  coverImage: detail.cover_image || "",
  images: detail.images?.length ? [...detail.images] : [],
  parameters: detail.parameters?.length ? [...detail.parameters] : [""],
  price: detail.price || 0,
  inStock: detail.in_stock || 0,
  sizes: (detail.sizes || []).map(s => ({
    size: s.size,
    materials: (s.materials || []).map(m => ({
      name: m.name,
      image: m.image,
      price: m.price,
      inStock: m.in_stock
    }))
  }))
});

export const listToUi = (items: AdminListItem[]): BackofficeItemNS.Props[] =>
  (items || []).map(item => ({
    id: String(item.id),
    title: item.title,
    article: item.article,
    preview: item.cover_image,
    price: item.price,
    types: (item.types || [])
      .map(t => adaptCatalogFilter.fromDto(t))
      .map(t => furnitureName[t as FurnitureType]?.short || t)
      .join(", ")
  }));
