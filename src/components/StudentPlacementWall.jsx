import React from 'react';
import { Award, CheckCircle, Sparkles, Star, TrendingUp, Building2, GraduationCap } from 'lucide-react';

const StudentPlacementWall = ({ darkMode }) => {
  const placements = [
    {
      name: 'Ananya Sharma',
      role: 'Software Engineer @ Google',
      package: '₹42 LPA',
      domain: 'Engineering & AI',
      matchScore: '98% Fit',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      badge: 'Google',
      quote: "Cognitrail's skills gap analyzer showed me exactly what algorithms and cloud concepts I was missing. Saved me months of confused prep!"
    },
    {
      name: 'Rohan Mehta',
      role: 'AI Research Scientist @ Microsoft',
      package: '₹38 LPA',
      domain: 'Data Science & ML',
      matchScore: '96% Fit',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      badge: 'Microsoft',
      quote: "The interactive roadmap builder laid out step-by-step milestones from my 3rd year project to campus placements seamlessly."
    },
    {
      name: 'Priya Nair',
      role: 'Lead UI/UX Designer @ Adobe',
      package: '₹28 LPA',
      domain: 'Arts & Product Design',
      matchScore: '95% Fit',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      badge: 'Adobe',
      quote: "I was torn between graphic design and product design. Cognitrail gave me total clarity on portfolio expectations and industry packages."
    },
    {
      name: 'Dr. Vikram Verma',
      role: 'Resident Surgeon @ AIIMS Delhi',
      package: '₹32 LPA',
      domain: 'Medicine & Healthcare',
      matchScore: '99% Fit',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      badge: 'AIIMS Delhi',
      quote: "Comprehensive entrance exam timelines and specialization breakdown helped me align my NEET PG target without stress."
    }
  ];

  return (
    <section className="my-20 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-md shadow-[#0265A6]/20">
          <Award className="w-3.5 h-3.5" />
          <span>Verified Student Success Stories</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'} mb-4 tracking-tight`}>
          From Learning Roadmaps to Dream Placements
        </h2>
        <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Join over 12,000+ students who mapped their target skillsets with Cognitrail AI and secured top offers across premier companies & institutions.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {placements.map((item, idx) => (
          <div
            key={idx}
            className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover-lift ${
              darkMode
                ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] hover:shadow-[0_12px_35px_rgba(2,101,166,0.25)]'
                : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md hover:shadow-[0_12px_35px_rgba(2,101,166,0.18)]'
            }`}
          >
            <div>
              {/* Top Row: Avatar & Verified Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0265A6] shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#0265A6] text-white p-0.5 rounded-full" title="Verified Placement">
                    <CheckCircle className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm">
                    {item.package}
                  </span>
                  <div className="text-[10px] font-bold text-[#6096BA] mt-1 flex items-center justify-end gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{item.matchScore}</span>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className={`text-base font-black line-clamp-1 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                {item.name}
              </h3>
              <p className="text-xs font-bold text-[#0265A6] mb-3 line-clamp-1">
                {item.role}
              </p>

              {/* Quote */}
              <p className={`text-xs leading-relaxed italic mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                "{item.quote}"
              </p>
            </div>

            {/* Bottom Footer Badge */}
            <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-semibold ${
              darkMode ? 'border-[#003B73] text-zinc-400' : 'border-[#BACDDF]/60 text-zinc-500'
            }`}>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#0265A6]" />
                <span className="font-bold text-[#6096BA]">{item.badge}</span>
              </div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentPlacementWall;
