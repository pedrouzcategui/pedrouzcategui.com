import Link from "next/link";
import styles from "./styles.module.css";
import { getSortedPostsData } from "../../../lib/posts";
export const metadata = {
    title: 'Blog',
    description: 'Blog',
};

export default function NamePage() {
    const posts = getSortedPostsData();
    return (
        <div className="p-5 min-h-screen bg-gradient-to-r from-black via-slate-950 to-gray-950 text-white">
            <h1 className="text-2xl font-bold">Blog posts</h1>
            <ul className={styles.list}>
                {posts.map(post => {
                    return <li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.title}</Link></li>
                })}
            </ul>
        </div>
    );
}