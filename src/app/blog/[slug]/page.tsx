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
        <main>
            <div>
                <div className="p-5 md:w-3/4">
                    <h1 className="text-5xl mb-0 text-green-500 font-bold">{title}</h1>
                    <p className="mt-0">
                        {pubDate}
                    </p>
                    <Link href="/blog">← Back to blog posts</Link>
                </div>
                <div className="bg-white">
                    <article className={`${styles.article} p-5 text-black`}>
                        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    </article>
                </div>
            </div>
        </main>
    )
}