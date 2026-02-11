import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "ID (slug)",
      type: "string",
      description: "Unique identifier, e.g. sets, rolls, sushi",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort order (lower = first)",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Slug", name: "slugAsc", by: [{ field: "slug", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.ru", subtitle: "slug" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled", subtitle };
    },
  },
});
