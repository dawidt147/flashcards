export function slugify(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .normalize("NFD")                    // split accents: é → e + ́
    .replace(/[\u0300-\u036f]/g, "")       // remove accent marks
    .replace(/[^a-z0-9\s-]/g, "")          // drop special chars
    .replace(/\s+/g, "-")                  // spaces → hyphens
    .replace(/-+/g, "-")                   // collapse ---- → -
    .replace(/^-|-$/g, "");                 // trim leading/trailing -
  
  if (slug === "") {
    return "untitled";
  }

  return slug;
}