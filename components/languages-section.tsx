import Link from 'next/link'
import Image from 'next/image'

const languages = [
    {
        id: 'francais',
        name: 'Français',
        description: 'Plongez dans la richesse culturelle de la langue de Molière, parlée sur les 5 continents.',
        image: '/images/french.png',
        color: 'bg-blue-600'
    },
    {
        id: 'anglais',
        name: 'Anglais',
        description: 'Ouvrez les portes du monde avec la langue internationale des affaires et du voyage.',
        image: '/images/uk.jpg',
        color: 'bg-red-600'
    },
    {
        id: 'allemand',
        name: 'Allemand',
        description: "Explorez la langue de la technologie et de l'innovation au cœur de l'Europe.",
        image: '/images/allemand.avif',
        color: 'bg-yellow-500'
    },
    {
        id: 'espagnol',
        name: 'Espagnol',
        description: "Découvrez la passion et la chaleur de l'Espagnol, la deuxième langue la plus parlée au monde.",
        image: '/images/espagnol.avif',
        color: 'bg-orange-500'
    }
]

export default function LanguagesSection() {
    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">Apprenez une nouvelle langue</h2>
                    <p className="text-foreground/70 text-lg">
                        Choisissez votre destination linguistique et commencez une aventure enrichissante dès aujourd'hui.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {languages.map((lang) => (
                        <div
                            key={lang.id}
                            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-24 h-24 rounded-full bg-background shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden relative">
                                <Image
                                    src={lang.image}
                                    alt={lang.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                {lang.name}
                            </h3>

                            <p className="text-foreground/70 mb-8 flex-grow">
                                {lang.description}
                            </p>

                            <Link
                                href={`/langues/${lang.id}`}
                                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg w-full"
                            >
                                Découvrir
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
