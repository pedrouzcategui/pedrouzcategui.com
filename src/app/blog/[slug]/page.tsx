import getFormattedDate from "@/lib/getFormattedDate"
import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import styles from "./style.module.css"
import hero from "@/public/assets/grid-pattern.png"

export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postSlug: post.slug
    }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {

    const posts = getSortedPostsData()
    const { slug } = params

    const post = posts.find(post => post.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title + " - Pedro Uzcategui",
    }
}

export default async function Post({ params }: { params: { slug: string } }) {

    const posts = getSortedPostsData()
    const { slug } = params

    if (!posts.find(post => post.slug === slug)) notFound()

    const { title, date, contentHtml } = await getPostData(slug)

    const pubDate = getFormattedDate(date)

    return (
        <main className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-gray-950 text-white">
            <div className="w-2/4 mx-auto p-5">
                <div>
                    <Link href="/blog">← Back to blog posts</Link>
                    <h1 className="text-4xl mt-5 mb-5  font-bold">{title}</h1>
                    <p className="mt-0">
                        {pubDate}
                    </p>
                    <p>Author: Pedro Uzcategui</p>
                    <p>Follow me on Twitter: <a target="_blank" href="https://twitter.com/PedroUzctegui4">Here</a></p>
                    <div className="mt-5">
                        <hr />
                    </div>
                </div>
                <div>
                    <article className={`${styles.article}`}>
                        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </article>
                </div>
            </div>
        </main>
    )
}