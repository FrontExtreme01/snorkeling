import { replaceHtmlEntities } from "@/utils/functions";

export default function BlogCard({ posts }: { posts: any[] }) {
    return (
        <>
            {posts.map((post, index) => (
                <article
                    key={index}
                >
                    <div className="flex flex-wrap flex-col rounded-xl bg-white shadow h-full group">
                        <div className="relative w-full">
                            <a href={`/blog/${post.slug}/`} aria-label={"View post " + replaceHtmlEntities(post.title)}>
                                <img
                                    src={post.featuredImage}
                                    alt={replaceHtmlEntities(post.title)}
                                    className="w-full h-40 md:h-64 object-cover rounded-lg"
                                />
                            </a>
                        </div>
                        <div className="py-6 px-5">
                            <div className="flex flex-wrap items-center justify-start gap-y-3 mb-4">
                                {post.categories.map((category: any) => (
                                    <a href={`/blog/category/${category.slug}/`} aria-label={"View all posts in " + category.name}>
                                        <span className="block px-3 py-1 bg-green-100 rounded-full font-bold text-xs text-green-700 w-fit mr-1">{category.name}</span>
                                    </a>
                                ))}
                            </div>
                            <h2 className="font-bold text-base/snug sm:text-xl/snug mb-3 text-start text-gray-800">
                                <a href={`/blog/${post.slug}/`} aria-label={"View post " + replaceHtmlEntities(post.title)} className="bg-linear-to-r from-green-600/50 to-emerald-500/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                                    {replaceHtmlEntities(post.title)}
                                </a>
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs sm:text-sm">
                                <div className="text-gray-500">
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="text-gray-500">{post.readingTime} read</div>
                            </div>
                        </div>
                    </div>
                </article>
            ))}

        </>
    )
}