import "./globals.css";
import { Poppins } from "@next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactQuery from "@/components/ReactQuery";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <ReactQuery>
          <div className={`${poppins.className} px-8 pt-8`}>{children}</div>
        </ReactQuery>
        <Footer />
      </body>
    </html>
  );
}
