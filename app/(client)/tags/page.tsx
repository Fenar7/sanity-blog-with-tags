import React from 'react';
import { client } from '@/sanity/lib/client';
import { Tag } from '@/app/utils/interface';
import Header from '@/app/components/Header';
import Link from 'next/link';

async function getAllTags() {
  const query = `
    *[_type == "tag"] {
        name,
        slug,
        _id,
        "postCount": count(*[_type == "post" && references(^._id)])
    }
  `;
  const tags = await client.fetch(query); // Await the client.fetch
  return tags;
}

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 60; // Still use ISR to revalidate every 60 seconds

const Page = async () => {
  const tags: Tag[] = await getAllTags(); // Fix type to Tag[]

  return (
    <div>
      <Header title="Tags" />
      <div>
        {tags?.length > 0 &&
          tags?.map((tag) => (
            <Link key={tag?._id} href={`/tags/${tag.slug.current}`}>
              <div className="mb-12 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500">
                #{tag.name} ({tag?.postCount})
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Page;
