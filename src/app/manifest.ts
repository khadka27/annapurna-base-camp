import { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo-schemas";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Annapurna Guesthouse • Base Camp 4,130m",
    short_name: SITE_NAME,
    description:
      "Luxury sanctuary lodging, heated suites, and mountain hospitality at 4,130m elevation in Annapurna Base Camp, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#102542",
    theme_color: "#395371",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
