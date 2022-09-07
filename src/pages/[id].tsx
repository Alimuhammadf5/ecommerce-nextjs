import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { trpc } from "../utils/trpc";
import { useCart } from "react-use-cart";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			idQuery: context.query.id,
		},
	};
}

const ProductDetail: FC<any> = ({ idQuery }) => {
	const { data } = trpc.useQuery([
		"product.get",
		{
			id: idQuery,
		},
	]);

	const { addItem, items } = useCart();

	return (
		<>
			<Head>
				<title>Clothing</title>
				<meta
					name="description"
					content="This a ecommerce app with nextjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-screen min-h-screen flex flex-col justify-center items-center py-28">
				<div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 pb-10 gap-10 px-7">
					<section className="flex justify-center items-center">
						<img src={data?.imageUrl} className="rounded-md" />
					</section>
					<section className="flex flex-col md:justify-between">
						<div>
							<p className="font-medium opacity-60">
								Clothing. Ecommerce
							</p>
							<h1 className="mt-5 font-bold text-3xl md:text-4xl">
								{data?.title}
							</h1>
							<h4 className="font-medium text-2xl md:text-3xl mt-3 md:mt-8">
								${data?.price}
							</h4>
							<p className="mt-6">Color</p>
							<div className="mt-2 bg-gray-300 border border-gray-500 w-8 h-8 rounded-full"></div>
							<p className="mt-4 opacity-80">
								Clothing (also known as clothes, apparel, and
								attire) are items worn on the body. Typically,
								clothing is made of fabrics or textiles, but
								over time it has included garments made from
								animal skin.
							</p>
						</div>

						<button
							onClick={() => addItem(data as any)}
							className="bg-blue-600 hover:bg-blue-700 duration-300 text-white mt-7 w-full h-14 rounded-lg"
						>
							Add to cart
						</button>
					</section>
				</div>
			</main>
		</>
	);
};

export default ProductDetail;