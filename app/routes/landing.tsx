import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { BookOpen, Search, Library, ArrowRight, Compass, GraduationCap, Building2 } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="absolute top-0 w-full px-6 py-6 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200">
            <Library className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            College Library
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Sign In
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm font-semibold h-10 px-6 rounded-full transition-all hover:-translate-y-0.5 active:translate-y-0">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-48 w-[600px] h-[600px] bg-violet-100/50 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200 text-xs font-semibold text-blue-600 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Fall Semester Catalog Available
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-slate-900 leading-[1.1]">
          Unlock your potential at <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            the University Library.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium">
          Your gateway to knowledge, discovery, and innovation. Access thousands of academic resources, research databases, and quiet study spaces.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
          <Link to="/register">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 h-14 px-8 rounded-full font-semibold text-base transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-2">
              Explore Collections <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-14 px-8 rounded-full font-semibold text-base transition-all shadow-sm">
              Student Portal
            </Button>
          </Link>
        </div>
      </main>

      {/* Features Grid (Glassmorphism Style) */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Discover Collections",
              description: "Explore physical books, academic journals, and extensive digital archives tailored for your courses.",
              icon: Compass,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100"
            },
            {
              title: "Research Tools",
              description: "Access global databases, citation generators, and dedicated academic research workstations.",
              icon: Search,
              color: "text-violet-600",
              bg: "bg-violet-50",
              border: "border-violet-100"
            },
            {
              title: "Study Spaces",
              description: "Reserve quiet study rooms, collaborative spaces, or computer labs for your next big project.",
              icon: Building2,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border ${feature.border} shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1`}
            >
              <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 mt-10 bg-white/50 backdrop-blur-sm text-center text-slate-500 font-medium text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5" />
        </div>
        <p>© {new Date().getFullYear()} College Library System. Empowering students daily.</p>
      </footer>
    </div>
  );
}
