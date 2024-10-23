import {client} from "@/sanity/lib/client";

const getPosts = async () => {
  const query = `
    *[_type == "post"] {
      title,
      slug,
      publishedAt,
      excerpt
    }
  `  
  const data = await client.fetch(query)
  return data
};


export default async function Home() {
  const posts = await getPosts()
  console.log(posts)
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
