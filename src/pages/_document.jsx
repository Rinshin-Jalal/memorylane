import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
        <meta
          name="keywords"
          content="TypeScript, React, NextJS, Styled Components"
        />
        <meta name="author" content="Tech Optimum" />
        <meta name="robot" content="index, follow" />
        <meta name="og:title" content="Memory lane | Social" />
        <meta
          name="og:description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
