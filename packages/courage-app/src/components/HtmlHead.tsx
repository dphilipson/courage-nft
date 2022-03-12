import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";

const DEFAULT_DESCRIPTION =
  "The token you had all along, even if you didn't know it.";

export interface HtmlHeadProps {
  title: string;
  description?: string;
}

export default function HtmlHead({
  title,
  description = DEFAULT_DESCRIPTION,
}: HtmlHeadProps): ReactElement {
  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      meta={[
        { name: "description", content: description },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        // { property: "og:image", content: courageLogo },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site:id", content: "1389683026762764290" },
        { name: "twitter:creator:id", content: "1389683026762764290" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        // { name: "twitter:image", content: courageLogo },
      ]}
      link={[
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
        },
      ]}
    />
  );
}
