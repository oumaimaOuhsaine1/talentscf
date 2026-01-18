'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface BlogPost {
    id: string
    title: string
    excerpt: string
    content?: string
    image: string
    date: string
    category: string
    readTime: string
}

export default function BlogPostPage() {
    const params = useParams()
    const [isDark, setIsDark] = useState(false)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        loadPost()
    }, [params.id])

    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    const loadPost = () => {
        const storedPosts = localStorage.getItem('blog-posts')
        if (storedPosts) {
            const posts: BlogPost[] = JSON.parse(storedPosts)
            const foundPost = posts.find(p => p.id === params.id)
            setPost(foundPost || null)
        }
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Chargement...</p>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col bg-background text-foreground">
                <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
                        <Link href="/blog" className="text-primary hover:underline">
                            Retour au blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Hero Image */}
                <div className="relative h-[500px] w-full overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                    <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6"
                        >
                            <ArrowLeft size={16} />
                            Retour au blog
                        </Link>

                        {/* Category */}
                        <span className="inline-block px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-6 text-foreground/60 mb-8 pb-8 border-b border-border">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{post.readTime} de lecture</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-foreground/80 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="space-y-4 text-foreground/70">
                                <p>
                                    {post.content || "Cet article explore en profondeur les concepts clés et offre des perspectives pratiques pour améliorer vos compétences professionnelles. Nos experts partagent leurs connaissances et leur expérience pour vous aider à atteindre vos objectifs."}
                                </p>
                                <p>
                                    La formation continue est essentielle dans le monde professionnel d'aujourd'hui. Elle permet non seulement d'acquérir de nouvelles compétences, mais aussi de rester compétitif et pertinent dans votre domaine.
                                </p>
                                <p>
                                    Chez Talents Consulting & Formation, nous croyons en l'importance de l'apprentissage tout au long de la vie. Nos programmes sont conçus pour répondre aux besoins spécifiques de chaque individu et organisation.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">Intéressé par nos formations ?</h3>
                                <p className="text-foreground/70 mb-4">
                                    Découvrez notre catalogue complet de formations et trouvez celle qui correspond à vos besoins.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Nous contacter
                                    <ArrowLeft size={16} className="rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Spacing */}
                <div className="h-20" />
            </main>

            <Footer />
        </div>
    )
}
