import { defineField, defineType } from "sanity";

export default defineType({
  name: "promotion",
  title: "Promotion",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "ID (slug)",
      type: "string",
      description: "Unique identifier, e.g. promo-1",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional link (e.g. Telegram bot)",
    }),
  ],
  preview: {
    select: { title: "title.ru" },
    prepare({ title }) {
      return { title: title || "Untitled Promotion" };
    },
  },
});
