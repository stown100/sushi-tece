import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { TagIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import BulkPriceTool from "./sanity/tools/BulkPriceTool";

export default defineConfig({
  name: "sushi-ym",
  title: "SUSHI YM CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  tools: (prev) => [
    ...prev,
    {
      name: "prices",
      title: "Цены",
      icon: TagIcon,
      component: BulkPriceTool,
    },
  ],
});
