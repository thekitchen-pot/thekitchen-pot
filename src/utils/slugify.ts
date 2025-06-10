/**
 * Converts a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A lowercase string with spaces and special characters replaced with hyphens
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFKD') // normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .trim()
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // trim hyphens from start
    .replace(/-+$/, ''); // trim hyphens from end
}

/**
 * Creates an author slug from their name
 * @param name The author's full name
 * @returns A URL-friendly slug prefixed with /authors/
 */
export function createAuthorSlug(name: string): string {
  return `/authors/${slugify(name)}/`;
}
