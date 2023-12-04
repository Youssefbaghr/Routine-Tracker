import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Routine Planner",
  description: "Canlender and Routine Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
