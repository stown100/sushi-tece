export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc, slug asc) {
  _id,
  slug,
  name,
  order
}`;

export const PRODUCTS_QUERY = `*[_type == "product"] | order(category->order asc, category->slug asc, slug asc) {
  _id,
  slug,
  name,
  description,
  "category": category->slug,
  subcategory,
  price,
  weight,
  image,
  badge,
  "recommendations": recommendations[]->slug
}`;

export const PROMOTIONS_QUERY = `*[_type == "promotion"] | order(slug asc) {
  _id,
  slug,
  title,
  description,
  image,
  link
}`;
