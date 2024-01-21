import Link from "next/link";
import styles from "./styles.module.css";
export const metadata = {
    title: 'Blog',
    description: 'Blog',
};

export default function NamePage() {
    return (
        <div className="p-5 min-h-screen bg-gradient-to-r from-black via-slate-950 to-gray-950 text-white">
            <h1 className="text-2xl font-bold">Blog posts</h1>
            <ul className={styles.list}>
            //TODO: Blogs
            </ul>
        </div>
    );
}