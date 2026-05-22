import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_COLLECTIONS = [
  {
    name: 'The Cinematic Signature',
    description: 'Our most comprehensive storytelling experience, designed for lavish celebrations. We capture every fleeting emotion and grand gesture with cinematic precision.',
    features: [
      'Cinematic Wedding Film & Teaser',
      'Candid & Fine Art Portraiture',
      'Drone & Multi-Camera Setup',
      'Bespoke Album Design'
    ],
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'The Heritage Essential',
    description: 'A beautifully curated approach focusing on the core traditions and intimate moments of your special day. Pure, timeless, and effortlessly elegant.',
    features: [
      'Traditional & Candid Photography',
      'Event Highlight Video',
      'Complete Digital Gallery',
      'Pre-Wedding Consultation'
    ],
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

export default function Packages() {
  const [collections, setCollections] = useState<any[]>(DEFAULT_COLLECTIONS);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('site_images')
          .select('*')
          .eq('section', 'packages')
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((item: any, index: number) => {
            // Strip pricing completely
            const [name] = item.title.includes('|')
              ? item.title.split('|').map((s: string) => s.trim())
              : [item.title];

            return {
              name: name,
              description: item.category || 'A meticulously crafted photography experience.',
              features: item.description?.split('\n').filter((f: string) => f.trim()) || [],
              image: item.url || DEFAULT_COLLECTIONS[index % 2].image
            };
          });
          setCollections(formatted);
        }

      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section id="packages" className="py-24 md:py-40 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <span className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Curated Experiences</span>
          <h2 className="text-4xl md:text-6xl text-white mt-4 font-serif leading-tight max-w-2xl">
            Signature Collections
          </h2>
          <div className="w-16 h-[1px] bg-[#c1272d] mt-8"></div>
        </div>

        {/* Collections Stack */}
        <div className="space-y-24 md:space-y-40">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Image Frame */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-sm relative">
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  {/* Decorative Frame Line */}
                  <div className={`absolute -inset-4 border border-white/10 -z-10 transition-transform duration-700 ${isEven ? '-translate-x-4 translate-y-4' : 'translate-x-4 translate-y-4'}`}></div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-[#c1272d] text-sm font-black uppercase tracking-[0.2em] mb-4">Collection {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">{collection.name}</h3>
                  <p className="text-gray-400 leading-relaxed font-light mb-10 text-sm md:text-base max-w-lg">
                    {collection.description}
                  </p>

                  <div className="space-y-4 mb-12">
                    {collection.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <span className="text-gray-300 font-light text-sm tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 border-b border-white/30 pb-2 text-white hover:text-[#c1272d] hover:border-[#c1272d] transition-colors duration-300 uppercase tracking-widest text-xs font-semibold group"
                    >
                      Inquire About This Collection
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}