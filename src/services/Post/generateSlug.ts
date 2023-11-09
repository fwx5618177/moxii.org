/**
 * Generate a slug from a title
 * @param title The title of the post
 * @returns A URL-friendly string derived from the title
 */
export const generateSlug = (title: string | undefined): string => {
  return title ? title.toLowerCase().replace(/\s+/g, "-") : "untitled-post";
};
