'use client'
import { notFound, useParams } from "next/navigation";
import { getSortedPostsData } from "../../lib/posts"


export default function Post() {
    const posts = getSortedPostsData();
    const { slug } = useParams();
    const post = posts.find(post => post.slug == slug);
    if (!post) return notFound()
    return (
        <div>
            <div className="mx-auto w-4/5 my-5">
                <div>

                </div>
                <h1 className="text-5xl font-bold mb-4 text-green-500">{post.title}</h1>
                <div className="text-green-1w00">
                    Rest of the article written in Markdown I believe
                </div>
            </div>
        </div>
    )
}
