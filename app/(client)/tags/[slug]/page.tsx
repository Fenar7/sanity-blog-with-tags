import Header from '@/app/components/Header';
import React from 'react';
import { Post } from '@/app/utils/interface';
import { client } from '@/sanity/lib/client';
import PostComponent from '@/app/components/PostComponent';

async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
      title,
      slug,
      publishedAt,
      excerpt,
      _id,
      body,
      tags[] -> {
        _id,
        slug,
        name    
      }
    }
  `;

  const posts = await client.fetch(query);
  return posts;
}

interface Params {
  params: {
    slug: string;
  };
}


export const revalidate = 60;

const Page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);

  return (
    <div>
      <Header title={`#${params?.slug}`} tags/>
      {/* You can now render the posts */}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostComponent key={post?._id} post={post}/>
          ))
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
