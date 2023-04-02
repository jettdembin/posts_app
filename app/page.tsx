"use client";
import AddPosts from "./components/AddPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//Fetch all posts
const allPosts = async () => {
	const response = await axios.get("/api/posts/getPosts");
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery({
		queryFn: allPosts,
		queryKey: ["posts"],
	});
	if (error) return error;
	if (isLoading) return "Loading";
	console.log(data);
	return (
		<main>
			{data.map((d) => (
				<div>{}</div>
			))}
			<AddPosts />
		</main>
	);
}
