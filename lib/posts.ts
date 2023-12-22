import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  const filenames = fs.readdirSync(postsDirectory);
  const allPostsData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullpath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullpath, "utf-8");
    const matterResult = matter(fileContents);
    const blogPost: BlogPost = {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
    return blogPost;
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };

  // Combine the data with the id
  return blogPostWithHTML;
}
