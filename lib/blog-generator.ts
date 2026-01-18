// Service pour générer automatiquement des articles de blog
export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content?: string
    image: string
    date: string
    category: string
    readTime: string
}

const blogTopics = [
    {
        category: 'Formation',
        titles: [
            'Les nouvelles méthodes d\'apprentissage en entreprise',
            'Comment choisir la bonne formation pour votre carrière',
            'L\'importance de la formation continue en 2026',
            'Les tendances de la formation professionnelle',
            'Formation digitale vs formation présentielle'
        ],
        excerpts: [
            'Découvrez les approches innovantes qui transforment la formation en entreprise.',
            'Guide complet pour sélectionner la formation qui correspond à vos objectifs professionnels.',
            'Pourquoi investir dans votre développement professionnel est plus important que jamais.',
            'Explorez les nouvelles tendances qui façonnent l\'avenir de la formation.',
            'Comparaison des avantages et inconvénients de chaque modalité de formation.'
        ]
    },
    {
        category: 'Coaching',
        titles: [
            'Le coaching : un levier de performance en entreprise',
            'Comment le coaching transforme les équipes',
            'Les bénéfices du coaching individuel',
            'Coaching d\'équipe : méthodologies et résultats',
            'Le rôle du coach dans le développement professionnel'
        ],
        excerpts: [
            'Découvrez comment le coaching peut améliorer la performance de votre organisation.',
            'Les techniques de coaching qui révolutionnent la dynamique d\'équipe.',
            'Pourquoi investir dans un accompagnement personnalisé peut changer votre carrière.',
            'Les meilleures pratiques pour un coaching d\'équipe efficace.',
            'Comprendre l\'impact du coaching sur votre évolution professionnelle.'
        ]
    },
    {
        category: 'PNL',
        titles: [
            'Introduction à la Programmation Neuro-Linguistique',
            'PNL : techniques pour améliorer votre communication',
            'Comment la PNL peut transformer votre vie',
            'Les applications de la PNL en entreprise',
            'PNL et développement personnel : un duo gagnant'
        ],
        excerpts: [
            'Découvrez les fondamentaux de la PNL et son impact sur le développement personnel.',
            'Maîtrisez les techniques de communication grâce à la PNL.',
            'Les principes de la PNL appliqués à votre quotidien professionnel et personnel.',
            'Comment utiliser la PNL pour améliorer la performance en entreprise.',
            'L\'alliance parfaite entre PNL et croissance personnelle.'
        ]
    },
    {
        category: 'Soft Skills',
        titles: [
            'Les soft skills les plus recherchées en 2026',
            'Développer son intelligence émotionnelle au travail',
            'Leadership et soft skills : le duo gagnant',
            'Communication efficace : les clés du succès',
            'Gestion du stress et performance professionnelle'
        ],
        excerpts: [
            'Identifiez les compétences transversales essentielles pour votre carrière.',
            'Comment cultiver votre intelligence émotionnelle pour mieux collaborer.',
            'Les soft skills indispensables pour devenir un leader inspirant.',
            'Maîtrisez l\'art de la communication pour des relations professionnelles réussies.',
            'Techniques éprouvées pour gérer le stress et maintenir votre performance.'
        ]
    }
]

const blogImages = [
    '/images/coaching.jfif',
    '/neuro-linguistic-programming.jpg',
    '/personal-development.png',
    '/leadership-training-workshop.png',
    '/team-building-activities.png',
    '/corporate-training-session.png',
    '/coaching-session.png',
    '/professional-development.jpg'
]

export function generateBlogPost(): BlogPost {
    const topic = blogTopics[Math.floor(Math.random() * blogTopics.length)]
    const titleIndex = Math.floor(Math.random() * topic.titles.length)
    const image = blogImages[Math.floor(Math.random() * blogImages.length)]

    return {
        id: `post-${Date.now()}`,
        title: topic.titles[titleIndex],
        excerpt: topic.excerpts[titleIndex],
        image: image,
        date: new Date().toISOString(),
        category: topic.category,
        readTime: `${Math.floor(Math.random() * 3) + 4} min`
    }
}

export function initializeBlogPosts(): BlogPost[] {
    const existingPosts = localStorage.getItem('blog-posts')
    if (existingPosts) {
        return JSON.parse(existingPosts)
    }

    const initialPosts: BlogPost[] = [
        {
            id: 'post-1',
            title: 'Les tendances de la formation professionnelle en 2026',
            excerpt: 'Découvrez les nouvelles approches pédagogiques qui transforment le monde de la formation professionnelle.',
            image: '/images/coaching.jfif',
            date: new Date().toISOString(),
            category: 'Formation',
            readTime: '5 min'
        },
        {
            id: 'post-2',
            title: 'L\'importance du coaching en entreprise',
            excerpt: 'Comment le coaching peut transformer la performance de vos équipes et améliorer le bien-être au travail.',
            image: '/neuro-linguistic-programming.jpg',
            date: new Date(Date.now() - 86400000).toISOString(),
            category: 'Coaching',
            readTime: '4 min'
        },
        {
            id: 'post-3',
            title: 'PNL : Un outil puissant pour le développement personnel',
            excerpt: 'Explorez les techniques de Programmation Neuro-Linguistique pour atteindre vos objectifs.',
            image: '/personal-development.png',
            date: new Date(Date.now() - 172800000).toISOString(),
            category: 'PNL',
            readTime: '6 min'
        }
    ]

    localStorage.setItem('blog-posts', JSON.stringify(initialPosts))
    localStorage.setItem('last-blog-generation', new Date().toISOString())

    return initialPosts
}

export function checkAndGenerateNewPost(): void {
    if (typeof window === 'undefined') return

    const lastGeneration = localStorage.getItem('last-blog-generation')
    const now = new Date()

    if (!lastGeneration) {
        initializeBlogPosts()
        return
    }

    const lastDate = new Date(lastGeneration)
    const hoursSinceLastGeneration = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60)

    // Générer un nouvel article toutes les 24 heures
    if (hoursSinceLastGeneration >= 24) {
        const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]')
        const newPost = generateBlogPost()

        // Ajouter le nouvel article au début
        posts.unshift(newPost)

        // Garder seulement les 20 articles les plus récents
        if (posts.length > 20) {
            posts.splice(20)
        }

        localStorage.setItem('blog-posts', JSON.stringify(posts))
        localStorage.setItem('last-blog-generation', now.toISOString())

        console.log('✅ Nouvel article de blog généré:', newPost.title)
    }
}
