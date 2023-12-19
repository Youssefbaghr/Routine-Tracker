import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import StoreProvider from '../StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Routine Planner ',
    description: 'Calendar and Routine Planner',
    author: 'Youssef Baghrous',
    keywords: 'routine planner, calendar, fitness, schedule, planning',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <Head>
                <title>{metadata.title}</title>

                <meta name='description' content={metadata.description} />
                <meta name='author' content={metadata.author} />
                <meta name='keywords' content={metadata.keywords} />
            </Head>
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
