import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

import {
  Search,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState<boolean[]>([false, false, false, false]);


  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = statsRef.current.findIndex((el) => el === entry.target);
          if (entry.isIntersecting && !hasAnimated[index]) {
            setHasAnimated((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      {
        threshold: 0.4,
      }
    );
  
    statsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  
    return () => {
      statsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [hasAnimated]);
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: false, // <- this allows reanimation on scroll
    });

    AOS.refresh(); // optional but helps with route-based loading
  }, []);

  const steps = [
    {
      icon: Search,
      title: "Post & Discover",
      description:
        "Share your skills or find exactly what you need. Our smart tagging system connects you with the perfect trading opportunities.",
      tags: ["#design", "#coding", "#tutoring", "#language"],
      delay: "0s",
    },
    {
      icon: Users,
      title: "Smart Matching",
      description:
        "Our algorithm finds compatible traders based on skills, availability, and reputation. Get matched with verified users instantly.",
      tags: ["#verified", "#instant", "#compatible"],
      delay: "0.2s",
    },
    {
      icon: CheckCircle,
      title: "Complete Trade",
      description:
        "Exchange skills safely with our secure platform. Build your reputation and unlock premium trading opportunities.",
      tags: ["#secure", "#reputation", "#growth"],
      delay: "0.4s",
    },
  ];

  return (
    <section id="how"  className="py-24 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-aos="fade-up"
          data-aos-delay="0"
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              How Bartr Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#6366f1] mb-6">
            Three Simple Steps to
            <span className="block bg-gradient-gold bg-clip-text text-[#6366f1]">
              Trading Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From posting your first skill to completing successful trades, we've
            made the process seamless and secure
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-aos="fade-left"
              data-aos-delay={index * 650}
              className="relative bg-background/80 backdrop-blur-sm border border-border/50 hover:-translate-y-2 hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] transition-all duration-500 group overflow-hidden"
            >
              {/* Glow strip */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#6366f1] to-transparent rounded-tr-full rounded-br-full   group-hover:  transition-opacity duration-500"></div>

              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>

              <CardContent className="p-8">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%] mb-4 group-[.in-view]:animate-float-sway">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {step.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-[#DBA7F2] text-sm font-medium animate-float-gentle"
                      style={{ animationDelay: `${tagIndex * 0.1}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Lines (Hidden on mobile) */}

        {/* Bottom CTA */}
        <div
  ref={ctaRef}
  data-aos="fade-up"
  data-aos-delay="300"
  className="flex justify-center text-[#6366f1]"
>
  <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-elegant hover:-translate-y-2 transition-all duration-500 w-full max-w-2xl">
    <h3 className="text-3xl font-bold mb-6 text-center">
      🎟 Token-Based Trading System
    </h3>

    <ul className="space-y-4 text-left text-muted-foreground text-lg leading-relaxed">
      {[
        "Each user starts with 10 free tokens.",
        "1 token is deducted from both parties after every successful trade.",
        "Refer friends using your invite link to earn bonus tokens.",
        "This system is separate from delivery costs.",
        "After using all tokens, users can choose to purchase more.",
        "Only one verified phone number gets 10 tokens — to prevent email abuse.",
      ].map((text, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-secondary mt-1">✓</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>

    <div className="mt-8 text-center">
      <Button
        variant="premium"
        size="lg"
        className="group"
        onClick={() =>
          toast("💡 Launching soon! You’ll be able to earn & spend tokens.")
        }
      >
        Learn More
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 ml-2" />
      </Button>
    </div>
  </div>
</div>


      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { end: 3214, suffix: "+", label: "Early Access Signups" },
          { end: 7, suffix: " Days", label: "Until Launch" },
          { end: 52, suffix: "+", label: "Countries Reached" },
          { end: 9800, suffix: "+", label: "On Waitlist" },
        ].map((stat, index) => (
          <div
            key={index}
            ref={(el) => (statsRef.current[index] = el)}
            data-aos="zoom-in"
            data-aos-delay={(index + 6) * 100}
            className="text-center"
          ><div className="text-3xl md:text-5xl font-extrabold text-secondary bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] drop-shadow-sm mb-2">
          {hasAnimated[index] ? (
            <CountUp
              start={0}
              end={stat.end}
              duration={3}
              separator=","
              suffix={stat.suffix}
            />
          ) : (
            "0"
          )}
        </div>
        
            <div className="text-base md:text-lg text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />;

    </section>
  );
};

export default HowItWorksSection;
