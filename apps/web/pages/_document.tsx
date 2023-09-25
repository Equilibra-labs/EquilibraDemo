import NextDocument, { Head, Html, Main, NextScript } from "next/document";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="h-full">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body
          className={`
        h-full
        bg-gray-900
        text-sky-400/80
        `}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
