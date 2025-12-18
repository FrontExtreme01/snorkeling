import { getAllPostSitemap, getTotalPosts } from "@/services/wp";

export async function GET(context) {

    const domain = context.site
    const perPage = 100;
    const { totalPosts } = await getTotalPosts({ idExclude: 0 }); // Exclude no posts
    const totalPages = Math.ceil(totalPosts / perPage);

    let allPosts = [];

    // Iterar sobre todas las páginas para obtener los slugs
    for (let page = 1; page <= totalPages; page++) {
        const posts = await getAllPostSitemap({ perPage, page });
        allPosts = allPosts.concat(posts.map(post => ({
            slug: post.slug,
        })));
    }


    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${domain}blog/</loc>
            </url>
            ${allPosts.map(post => `
            <url>
                <loc>${domain}blog/${post.slug}/</loc>
            </url>
            `).join('')}
        </urlset>`,
        {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600',
            },
        }
    );
}