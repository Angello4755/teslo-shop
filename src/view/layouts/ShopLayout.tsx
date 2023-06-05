import { FC, ReactElement } from "react";
import Head from "next/head";
import { SideMenu, Navbar } from "../Components/ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactElement;
}

export const ShopLayout: FC<Props> = ({
  children,
  title = "Teslo-shop",
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main style={{ margin: "80px", maxWidth: "1440px", padding: "0px 30px" }}>
        {children}
      </main>

      <footer>{/* footer */}</footer>
    </>
  );
};
