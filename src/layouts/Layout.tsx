import Head from "next/head";
import { FC, ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Header/Navbar";
import { Toaster } from "react-hot-toast";

interface layoutTypes {
	children: ReactNode;
}

const Layout: FC<layoutTypes> = ({ children }) => {
	return (
		<>
			<Head>
				<title>Ecommerce</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="overflow-x-hidden">
				<Toaster />
				<Navbar />
				{children}
				<Footer />
			</main>
		</>
	);
};

export default Layout;
