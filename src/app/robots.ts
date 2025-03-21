import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/galeria", "/galeria/*"],
    },

    sitemap: "https://www.zaapeventos.com.br/",
  };
}
