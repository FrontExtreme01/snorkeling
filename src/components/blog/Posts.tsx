import { useState, useEffect } from "react";
import { getPostsByPage, getTotalPosts } from "@/services/wp";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import BlogCard from "@/components/blog/BlogCard";

interface Posts {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    featuredImage: string;
    categories: {
        name: string;
        slug: string;
    }[];
    readingTime: string;
}

export default function Posts({ page = 1 }: { page?: number }) {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts()
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await getPostsByPage({ page });
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    if (loading) {
        return (
            <>
                <BlogSkeleton />
            </>
        );
    }
    return (
        <>
            <BlogCard posts={posts} />
        </>
    );
}