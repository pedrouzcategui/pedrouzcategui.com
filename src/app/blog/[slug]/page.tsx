import Link from "next/link"
import styles from "./style.module.css"

export default async function Post({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-gray-950 text-white">
            <div className="w-2/4 mx-auto p-5">
                <div>
                    <Link href="/blog">← Back to blog posts</Link>
                    <h1 className="text-4xl mt-5 mb-5  font-bold">Title</h1>
                    <p className="mt-0">
                        11
                    </p>
                    <p>Author: Pedro Uzcategui</p>
                    <p>Follow me on Twitter: <a target="_blank" href="https://twitter.com/PedroUzctegui4">Here</a></p>
                    <div className="mt-5">
                        <hr />
                    </div>
                </div>
                <div>
                    <article className={`${styles.article}`}>
                    </article>
                </div>
            </div>
        </main>
    )
}