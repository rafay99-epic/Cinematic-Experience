import { defineConfig } from "tinacms";

const branch = "main";

export default defineConfig({
  branch,

  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Articles",
        path: "/src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Article Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Article Description",
            required: true,
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "readingTime",
            label: "Article Reading Time",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Thumbnail Image",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
            ui: {
              component: "tags",
            },
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_INDEXER_TOKEN!,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
