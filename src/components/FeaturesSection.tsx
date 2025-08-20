import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Zap, Users, Trophy, Globe } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // animate every scroll into view
  }, []);
  
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('animate-fade-in-up');
  //           observer.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  //   );

  //   const elements = [headerRef.current, ...cardsRef.current, ...statsRef.current];
  //   elements.forEach((el) => {
  //     if (el) observer.observe(el);
  //   });

  //   return () => {
  //     elements.forEach((el) => {
  //       if (el) observer.unobserve(el);
  //     });
  //   };
  // }, []);
  const features = [
    {
      icon: Shield,
      title: "Verified Traders",
      description: "Every user undergoes verification. Trade with confidence knowing you're dealing with real, authenticated individuals.",
      badge: "Security First",
      gradient: "from-blue-500/10 to-purple-500/10"
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Our AI-powered algorithm finds perfect trading partners in seconds based on skills, location, and availability.",
      badge: "AI Powered",
      gradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      icon: Star,
      title: "Reputation System",
      description: "Build your trading reputation with every successful exchange. Higher ratings unlock premium opportunities.",
      badge: "Trust Building",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of students and professionals creating a new economy based on skills and knowledge exchange.",
      badge: "Growing Network",
      gradient: "from-pink-500/10 to-rose-500/10"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges, unlock special features, and showcase your expertise as you complete more successful trades.",
      badge: "Gamified",
      gradient: "from-purple-500/10 to-indigo-500/10"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with traders worldwide. Learn new languages, cultures, and skills from people across the globe.",
      badge: "Worldwide",
      gradient: "from-cyan-500/10 to-blue-500/10"
    }
  ];

  return (
    <section id='features' className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
  ref={headerRef}
  className="text-center mb-16"
  data-aos="fade-up"
  data-aos-duration="1000"
>

          <Badge variant="primary" className="mb-6 text-lg px-4 py-2 text-[#6366f1]">
            Why Choose Bartr?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold  mb-6 text-[#6366f1]">
            Features That Make
            <span className="block bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%]">Trading Effortless</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with cutting-edge technology and designed around user safety, our platform makes skill trading as easy as sending a message
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
            data-aos-delay={index * 100}
            className="group relative overflow-hidden bg-background border-border/50 hover:shadow-premium transition-all duration-500 hover:scale-105"
          >
          
              {/* Background Gradient */}
              
              <CardContent className="p-8 relative z-10">
                {/* Badge */}
                <div className="flex justify-between items-start mb-6">
                  <Badge  className="text-sm font-medium  text-[#DBA7F2]">
                    {feature.badge}
                  </Badge>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold  mb-3 group-hover:text-secondary transition-colors duration-300 text-[#6366f1]">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="inline-flex items-center text-secondary font-medium text-sm">
                    Explore Feature
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}


      </div>
    </section>
  );
};

export default FeaturesSection;