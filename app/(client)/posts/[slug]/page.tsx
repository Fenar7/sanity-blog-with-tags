import Header from '@/app/components/Header'
import React from 'react'
import { client } from "@/sanity/lib/client"
import { VT323 } from 'next/font/google';  // Correct import for fonts
import Link from 'next/link';
import { PortableText } from 'next-sanity';

interface Params {
  params: {
    slug: string
  }
}

const getPosts = async (slug: string) => {
  const query = `
    *[_type == "post" && slug.current == "${slug}"] {
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

  const posts = await client.fetch(query)
  return posts[0]; // Return the first post from the array
};

const dateFont = VT323({ weight: '400', subsets: ['latin'] });

const Page = async({ params }: Params) => {
  const post = await getPosts(params?.slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
            <span className={`${dateFont.className} my-2 text-purple-800`}>
              {new Date(post?.publishedAt).toDateString()}
            </span>

            <div className='mt-5'>
          {post?.tags?.map((tag) => {
            return (
              <Link key={tag?._id} href={`/tag/${tag.slug.current}`} className='text-center'>
                <span className='mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900'>#{tag.name} </span>
              </Link>
            );
          })}
          </div>

          <PortableText
            value={post.body}
          />
      </div>
    </div>
  );
}

export default Page;
