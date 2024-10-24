export interface Post {
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    body: any; // You should replace 'any' with a more specific type if possible
    tags: Array<Tag>;
    _id: string;
}

export interface Tag {
    name: string;
    slug: { current: string };
    _id: string;
    postCount?: number; // Optional property indicated by the question mark
}
