export const PRODUCTS_QUERY = `*[_type == "product"] | order(category asc, slug asc) {
  _id,
  slug,
  name,
  description,
  category,
  subcategory,
  price,
  weight,
  image,
  badge,
  utensils,
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
