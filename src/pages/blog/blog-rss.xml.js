import rss from '@astrojs/rss';
import { getPostsForRSS, getTotalPosts } from "@/services/wp";

export async function GET(context) {

    const domain = context.site
    const perPage = 100;
    const { totalPosts } = await getTotalPosts({ idExclude: 0 }); // Exclude no posts
    const totalPages = Math.ceil(totalPosts / perPage);

    let allPosts = [];

    // Iterar sobre todas las páginas para obtener los slugs
    for (let page = 1; page <= totalPages; page++) {
        const posts = await getPostsForRSS({ perPage, page });
        allPosts = allPosts.concat(posts.map(post => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            description: post.description,
        })));
    }

    return rss({
        title: "RSS Feed - Snorkeling Adventure Blog",
        description: "All posts of Snorkeling Adventure blog",
        customData: `<language>en-us</language>`,
        site: domain,
        items: allPosts.map(post => ({
            link: `/blog/${post.slug}/`,
            title: post.title,
            pubDate: post.date,
            description: post.description,
        })),
    });
}