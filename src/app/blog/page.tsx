import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
export const metadata = {
    title: 'Blog',
    description: 'Blog',
};

export default function NamePage() {
    const posts = getSortedPostsData();
    return (
        <div>
            <h1>Blog posts</h1>
            <ul style={{ marginLeft: 10 }}>
                {posts.map(post => {
                    return <li key={post.slug}><Link href={`/blog/${post.slug}`}> - {post.title}</Link></li>
                })}
            </ul>
        </div>
    );
}