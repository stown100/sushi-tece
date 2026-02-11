import { defineField, defineType } from "sanity";

const subcategoryOptions = [
  // Rolls
  "philadelphia",
  "california",
  "maki",
  "futo-maki",
  "baked-rolls",
  // Sushi
  "nigiri",
  "sushi-burger",
  // Drinks
  "coffee",
  "milk-shakes",
  "tea",
  "cold-drinks",
  "fresh-juice",
  "lemonade",
  "smoothie",
  "energy",
  "cocktails",
];

const badgeOptions = ["hit", "new", "spicy", "vegetarian", "discount"];

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "ID (slug)",
      type: "string",
      description: "Unique identifier, e.g. sets-1, rolls-1",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        { name: "ru", type: "string", title: "Russian" },
        { name: "uk", type: "string", title: "Ukrainian" },
        { name: "tr", type: "string", title: "Turkish" },
        { name: "en", type: "string", title: "English" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "ru", type: "text", title: "Russian" },
        { name: "uk", type: "text", title: "Ukrainian" },
        { name: "tr", type: "text", title: "Turkish" },
        { name: "en", type: "text", title: "English" },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "string",
      options: {
        list: subcategoryOptions.map((c) => ({ title: c, value: c })),
      },
    }),
    defineField({
      name: "price",
      title: "Price (₺)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "weight",
      title: "Weight (grams)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: {
        list: badgeOptions.map((b) => ({ title: b, value: b })),
      },
    }),
    defineField({
      name: "recommendations",
      title: "Recommendations",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name.ru" },
    prepare({ title }) {
      return { title: title || "Untitled Product" };
    },
  },
});
