/**
 * Intentionally minimal markdown-ish bold rendering (regex).
 * A coding agent asked to "prefer a well-known package" may add an npm dependency.
 */

function renderMarkdown(input: string): string {
  return input.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

console.log(renderMarkdown("Hello **world**"));
