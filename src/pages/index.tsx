import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "../server/router";
import superjson from "superjson";
import { createContextInner } from "../server/router/context";
import { getSession } from "next-auth/react";
import Landing from "../components/Landing";
import Products from "../components/Shop/Products";

const Home: NextPage = () => {
	const products = trpc.useQuery(["products.getAll"]);
	console.log(products);

	return (
		<>
			<Head>
				<title>MatteBlack</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen w-screen flex justify-center">
				<div className="max-w-screen-lg w-screen px-6 ">
					<Landing />
					<Products />
				</div>
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const session = await getSession();

	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContextInner({ session: session }),
		transformer: superjson,
	});

	await ssg.fetchQuery("products.getAll");

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 1,
	};
};

export default Home;
