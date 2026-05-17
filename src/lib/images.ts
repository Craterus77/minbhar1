/** Local product image served from /public/product-images */
export function productImage(filename: string): string {
  return `/product-images/${filename}`;
}
