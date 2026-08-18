import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.AUTH_URL ?? "http://localhost:3000"; return ["", "/about", "/dating", "/advertise", "/advertisements", "/safety", "/contact", "/terms", "/privacy"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
