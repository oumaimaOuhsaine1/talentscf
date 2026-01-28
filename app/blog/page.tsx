'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { checkAndGenerateNewPost, initializeBlogPosts } from '@/lib/blog-generator'

interface BlogPost {
    id: string
    title: string
    excerpt: string
    image: string
    date: string
    category: string
    readTime: string
}

export default function BlogPage() {
    const [isDark, setIsDark] = useState(false)
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        loadBlogPosts()
    }, [])

    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    const loadBlogPosts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/blog`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    const mappedData = data.map((p: any) => ({
                        ...p,
                        readTime: p.read_time || '5 min'
                    }));
                    setPosts(mappedData);
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error('Error fetching blog posts from backend:', error);
        }

        // Fallback to local generator if backend is not available or empty
        checkAndGenerateNewPost()
        const posts = initializeBlogPosts()
        setPosts(posts)
        setLoading(false)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-[#003E6B] to-[#002845]">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/images/bansection.jpg"
                            alt="Blog"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest animate-fade-in-up mb-4">
                            Blog
                        </h1>
                        <h6 className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100 font-normal">
                            Actualités, conseils et tendances en formation et développement professionnel
                        </h6>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-foreground/70">Chargement des articles...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {posts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(post.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-foreground/70 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                            >
                                                Lire la suite
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
