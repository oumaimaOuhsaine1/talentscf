import { GraduationCap, Clock, Award, Users } from "lucide-react"

const stats = [
    {
        icon: GraduationCap,
        value: "650",
        label: "Lauréats",
        description: ""
    },
    {
        icon: Clock,
        value: "12087",
        label: "Heures de formation",
        description: ""
    },
    {
        icon: Award,
        value: "15",
        label: "Ans d'excellence",
        description: ""
    },
    {
        icon: Users,
        value: "21",
        label: "Formateurs internationaux",
        description: ""
    }
]

export default function StatsSection() {
    return (
        <section className="py-12 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase leading-tight">
                        LE CENTRE <br />
                        TALENTS CONSULTING & FORMATIONS
                    </h2>
                    <p className="text-xl font-bold text-orange-500 uppercase tracking-wide">
                        EN QUELQUES CHIFFRES
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

            </div>
        </section>
    )
}

function StatCard({ icon: Icon, value, label }: any) {
    return (
        <div className="flex flex-col items-center text-center gap-2 group">
            <div className="text-orange-500 mb-1 group-hover:scale-110 transition-transform duration-300">
                <Icon size={56} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold text-blue-900">{value}</h3>
            <p className="text-base font-bold text-blue-900">{label}</p>
        </div>
    )
}
