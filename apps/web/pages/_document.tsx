import NextDocument, { Head, Html, Main, NextScript } from "next/document";
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="h-full bg-gray-900">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body
          className={`
        h-full
        bg-gray-900
        text-slate-100
        
        `}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

//<html class="h-full bg-gray-100">
