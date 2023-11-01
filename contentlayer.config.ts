import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { s } from "hastscript";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { class: "heading-link" },
          content: s("span", "#"),
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            // light: 'github-light',
            dark: "github-dark",
          },
        },
      ],
    ],
  },
});
