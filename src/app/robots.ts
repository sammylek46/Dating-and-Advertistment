import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { const base = process.env.AUTH_URL ?? "http://localhost:3000"; return { rules: { userAgent: "*", allow: ["/", "/about", "/dating", "/advertise", "/advertisements", "/safety"], disallow: ["/discover", "/dashboard", "/admin", "/messages", "/api"] }, sitemap: `${base}/sitemap.xml` }; }
