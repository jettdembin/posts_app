"use client";
import AddPosts from "./components/AddPosts";

export default function Home() {
	return (
		<main>
			<h1 className="text-lg py-5">Home</h1>
			<AddPosts />
		</main>
	);
}
