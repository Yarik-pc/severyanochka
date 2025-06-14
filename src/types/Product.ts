interface Product {
  id: number;
  title: string;
  price: number;
  discount_price: number;
  imageUrl: string;
  is_sale: boolean;
  is_new: boolean;
  categoryId: number,
  isFavorite?: boolean;
  isAdded?: boolean;
  favoriteId?: number | null;
  addedId?: number | null,
  parentId?: number;
  cartId?: number;
  quantity?: number,
}

export default Product;