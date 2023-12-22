import getFormattedDate from "@/lib/getFormattedDate"
import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import styles from "./style.module.css"

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
        <main className="w-3/4 px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <div>
                <h1 className="text-3xl mt-4 mb-0 text-green-500 font-bold">{title}</h1>
                <p className="mt-0 mb-5">
                    {pubDate}
                </p>
            </div>
            <article>
                <section className={styles.article} dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}