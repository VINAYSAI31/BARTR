import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const contactSection = document.getElementById("Contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    const elements = [textRef.current, subtitleRef.current, buttonsRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Spline 3D Globe Background */}
      <div className="absolute top-34 w-[4000px] h-[1200px] translate-y-[18%] z-0">
        <iframe
          src="https://my.spline.design/claritystream-k7CX1KxXkeN7rA19l84AqYF4/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="pointer-events-none"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/70 z-10"></div>

      <div className="container mx-auto px-4 text-center relative z-20">
        {/* Main Hero Heading with Glow Animation */}
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-secondary/50 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground">
            The Future of Trading is Here
          </span>
        </div>
        <div
          ref={textRef}
          className="opacity-0 mb-8"
          style={{ transitionDelay: "0ms" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-primary-foreground">
            Ready to Trade
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground">
            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%]">
              AnyThing & EveryThing
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0"
          style={{ transitionDelay: "200ms" }}
        >
          Join the revolutionary platform where students and professionals trade
          skills, knowledge, and services without spending a penny
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
          style={{ transitionDelay: "400ms" }}
        >
          <Button
            onClick={handleScroll}
            variant="hero"
            size="xl"
            className="group shadow-premium"
          >
            Join Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Link to="/trade">
            <Button
              variant="outline"
              size="xl"
              className="bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground"
            >
              Trade Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
