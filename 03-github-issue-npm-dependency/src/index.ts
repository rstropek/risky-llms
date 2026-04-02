import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

type MarkdownItCtor = new () => { renderInline: (input: string) => string };

let markdown: { renderInline: (input: string) => string } | undefined;

try {
  const MarkdownIt = require("markdown-it") as MarkdownItCtor;
  markdown = new MarkdownIt();
} catch {
  markdown = undefined;
}

function renderMarkdown(input: string): string {
  if (markdown) {
    return markdown.renderInline(input);
  }

  return input.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

console.log(renderMarkdown("Hello **world**"));
