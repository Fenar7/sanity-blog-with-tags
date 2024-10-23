import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import { Post } from "../utils/interface";

const getPosts = async () => {
  const query = `
    *[_type == "post"] {
      title,
      slug,
      publishedAt,
      excerpt,
      _id // Make sure you're fetching _id, as you're using it as a key
    }
  `;
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const posts: Post[] = await getPosts();
  console.log(posts);
  return (
    <div>
      <Header title="Articles" />
      <div>
        {posts.length > 0 &&
          posts.map((post) => (
            <p key={post._id}>{post.title}</p>
          ))} {/* Corrected this part */}
      </div>
    </div>
  );
}
