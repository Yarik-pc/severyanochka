import Product from "./Product";

interface Orders {
  id: number,
  items: Product[],
  totalPrice: number,
}
export default Orders;