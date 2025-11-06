const domain = import.meta.env.WP_BLOG;
const apiURl = `${domain}/wp-json/wp/v2`;

// Obtener el número total de posts/entradas
export const getTotalPosts = async ({ idExclude = 0 }: { idExclude?: number } = {}) => {
    const response = await fetch(`${apiURl}/posts?per_page=12&categories_exclude=${idExclude}`);

    if (!response.ok) {
        throw new Error('Failed to fetch total posts');
    }

    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    if (!totalPosts || !totalPages) {
        throw new Error('No posts found');
    }

    return { totalPosts: parseInt(totalPosts), totalPages: parseInt(totalPages) };
};

// Obtener el número total de posts por categoría
export const getTotalPostsByCategory = async ({ idCategory, perPage = 12, page = 1 }: { idCategory: number, perPage?: number, page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}&categories=${idCategory}`);

    if (!response.ok) {
        throw new Error('Failed to fetch total posts by category');
    }

    const totalPosts = response.headers.get('X-WP-TotalPages');

    if (!totalPosts) {
        throw new Error('No posts found');
    }

    return { totalPosts: parseInt(totalPosts) };
};

// Obtener la información de una página
export const getPageInfo = async (slug: string) => {
    const response = await fetch(`${apiURl}/pages?slug=${slug}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch page info');
    }

    const [data] = await response.json();
    const {
        title: { rendered: title },
        content: { rendered: content },
        yoast_head_json: {
            title: seoTitle,
            description: seoDescription,
            og_type: seoType,
        },
    } = data;

    return { title, content, seoTitle, seoDescription, seoType };
};

// Obtener detalles de un post/entrada
export const getPostInfo = async (slug: string) => {
    const response = await fetch(`${apiURl}/posts?slug=${slug}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch page info');
    }

    const [data] = await response.json();
    if (!data) {
        return {
            title: null,
            content: null,
            date: null,
            seoTitle: null,
            seoDescription: null,
            seoType: null,
            featuredImage: null,
            categories: null,
            readingTime: null,
        };
    }
    const {
        title: { rendered: title },
        content: { rendered: content },
        yoast_head_json: {
            title: seoTitle,
            description: seoDescription,
            og_type: seoType,
        },
        yoast_head_json: {
            twitter_misc: {
                "Est. reading time": readingTime,
            }
        },
        date,
    } = data;

    const featuredImage = data._embedded['wp:featuredmedia']?.[0]?.['media_details'].sizes?.medium_large.source_url;

    const categories = data._embedded['wp:term'][0];

    return { title, content, date, seoTitle, seoDescription, seoType, featuredImage, categories, readingTime };
};

// Obtener los últimos posts/entradas
export const getLatestPosts = async ({ perPage = 3 }: { perPage?: number }) => {
    const response = await fetch(`${apiURl}/posts?offset=1&per_page=${perPage}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch latest posts');
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No posts found');
    }

    const posts = results.map((post: any) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            date,
            slug,
            yoast_head_json: {
                twitter_misc: {
                    "Est. reading time": readingTime,
                }
            },
        } = post;

        const featuredImage = post._embedded['wp:featuredmedia']?.[0]?.['media_details'].sizes?.medium_large.source_url;;

        const categories = post._embedded['wp:term'][0];

        return { title, excerpt, date, slug, featuredImage, categories, readingTime };
    })

    return posts;
}

// Obtener el último post/entrada
export const getLastPost = async () => {
    const response = await fetch(`${apiURl}/posts?per_page=1&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch last post');
    }

    const [post] = await response.json();
    if (!post) {
        throw new Error('No post found');
    }

    const {
        title: { rendered: title },
        excerpt: { rendered: excerpt },
        date,
        slug,
        yoast_head_json: {
            twitter_misc: {
                "Est. reading time": readingTime,
            }
        },
    } = post;

    const featuredImage = post._embedded['wp:featuredmedia']?.[0]?.['media_details'].sizes?.medium_large.source_url;

    const categories = post._embedded['wp:term'][0];

    return { title, excerpt, date, slug, featuredImage, categories, readingTime };
};

// Obtener posts/entradas por página
export const getPostsByPage = async ({ perPage = 12, page = 1 }: { perPage?: number; page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts by page');
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No posts found');
    }

    const posts = results.map((post: any) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            date,
            slug,
            yoast_head_json: {
                twitter_misc: {
                    "Est. reading time": readingTime,
                }
            }
        } = post;

        const featuredImage = post._embedded['wp:featuredmedia']?.[0]?.['media_details'].sizes?.medium_large.source_url;

        const categories = post._embedded['wp:term'][0];

        return { title, excerpt, date, slug, featuredImage, categories, readingTime };
    })

    return posts;
}

// Obtener todos los posts/entradas (sitemap)
export const getAllPostSitemap = async ({ perPage = 12, page = 1 }: { perPage?: number; page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts by page');
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No posts found');
    }

    const posts = results.map((post: any) => {
        const {
            slug,
        } = post;

        return { slug };
    })

    return posts;
}

// Obtener los posts/entradas por categoría usando el slug
export const getPostsByCategoryByPage = async (idCategory: number, { perPage = 12, page = 1 }: { perPage?: number, page?: number }) => {
    // Obtener los posts de la categoría
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}&categories=${idCategory}&_embed`);
    if (!response.ok) {
        console.error('Failed to fetch posts by category, returning empty posts array');
        return {
            posts: [],
        }
    }

    const results = await response.json();
    if (!results.length) {
        console.error('No posts found in this category, returning empty posts array');
        return {
            posts: [],
        }
    }

    const posts = results.map((post: any) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            date,
            slug,
            yoast_head_json: {
                twitter_misc: {
                    "Est. reading time": readingTime,
                }
            }
        } = post;

        const featuredImage = post._embedded['wp:featuredmedia']?.[0]?.['media_details'].sizes?.medium_large.source_url;

        const categories = post._embedded['wp:term'][0];

        return { title, excerpt, date, slug, featuredImage, categories, readingTime };
    });

    return { posts };
};

// Obtener las categorías
export const getCategories = async () => {
    const response = await fetch(`${apiURl}/categories?per_page=100&hide_empty=true`);

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No categories found');
    }

    const categories = results.map((category: any) => {
        const {
            id,
            name,
            slug,
            count: totalPostsCount,
        } = category;

        return { id, name, slug, totalPostsCount };
    });

    return categories;
};

// Validación por slug para categorias
export const getCategoryBySlug = async (categorySlug: string) => {
    const response = await fetch(`${apiURl}/categories?slug=${categorySlug}`);
    if (!response.ok) {
        throw new Error('Failed to fetch category by slug');
    }

    const [category] = await response.json();
    if (!category) {
        return {
            id: null,
            name: null,
            totalPosts: null,
            slugCategory: null
        };
    }
    const { id, name, count: totalPosts, slug: slugCategory }: { id: number; name: string; count: number; slug: string } = category;

    return { id, name, totalPosts, slugCategory };
}

// Validación por página para todos los posts
export const getPostsByPageValidation = async ({ perPage = 12, page = 1 }: { perPage?: number; page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}`);
    if (!response.ok) {
        return false;
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No posts found');
    }

    return true;
};

// Validacion por página para posts por categoría
export const getPostsByCategoryByPageValidation = async (idCategory: number | null, { perPage = 12, page = 1 }: { perPage?: number; page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}&categories=${idCategory}`);
    if (!response.ok) {
        return false;
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No exists this category or posts found');
    }

    return true;
};

// Función para la creación del RSS
export const getPostsForRSS = async ({ perPage = 10, page = 1 }: { perPage?: number; page?: number }) => {
    const response = await fetch(`${apiURl}/posts?per_page=${perPage}&page=${page}&_embed`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts for RSS');
    }

    const results = await response.json();
    if (!results.length) {
        throw new Error('No posts found');
    }

    const posts = results.map((post: any) => {
        const {
            title: { rendered: title },
            date,
            slug,
            yoast_head_json: {
                description: description,
            }
        } = post;

        return { title, description, date, slug };
    });

    return posts;
}