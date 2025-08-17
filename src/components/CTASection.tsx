import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");

  React.useEffect(() => {
    // Dynamically load the Visme Forms script
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

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

    const elements = [cardRef.current, bottomRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && interest) {
      setIsSubmitted(true);
  
      // Simulate sending the data
      toast.success("You're on the waitlist! 🎉 We'll keep you updated.");
  
      // Clear fields
      setName("");
      setEmail("");
      setInterest("");
  
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };
  

  return (
    <section id="Contact" className="py-24  relative overflow-hidden">
      {/* Background Elements */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Card */}
        <Card
          ref={cardRef}
          className="max-w-4xl mx-auto bg-background/95 backdrop-blur-sm border border-border/50 shadow-elegant opacity-0 hover:scale-105 transition-all duration-500"
        >
          <CardContent className="p-12 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Join the Revolution
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#6366f1] mb-6">
              Ready to Transform
              <span className="block mt-2 bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent  ">
                Your Trading Game?
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be among the first to experience the future of skill trading. Join
              thousands who are already building their reputation on Bartr.
            </p>

            {/* Email Signup Form */}
            <div
        className="visme_d"
        data-title="Blog Contact Form"
        data-url="g0ok0z70-blog-contact-form"
        data-domain="forms"
        data-full-page="false"
        data-min-height="500px"
        data-form-id="139455"
      ></div>


            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <Users className="w-4 h-4" />
              <span>Join 12,847+ traders already on the waitlist</span>
            </div>

            {/* Action Buttons */}
            <Link to="/trade">
              <Button
                variant="hero"
                size="xl"
                className="group"
              >
                Start Trading Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  Free
                </div>
                <div className="text-xs text-muted-foreground">
                  Always & Forever
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  Secure
                </div>
                <div className="text-xs text-muted-foreground">
                  Bank-Level Security
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  Verified
                </div>
                <div className="text-xs text-muted-foreground">
                  All Users Checked
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Message */}
        <div ref={bottomRef} className="text-center mt-12 opacity-0">
          <p className="text-muted-foreground">
            No credit card required • Start trading in under 5 minutes • Cancel
            anytime
          </p>
        </div>
      </div>
      {/* Floating CTA Elements */}
      <div
        className="absolute bottom-10 left-10 animate-float-gentle"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="bg-secondary/10 backdrop-blur-sm rounded-full p-3">
          <Sparkles className="w-6 h-6 text-secondary" />
        </div>
      </div>
      <div
        className="absolute top-20 right-20 animate-float-gentle"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="bg-accent/10 backdrop-blur-sm rounded-full p-3">
          <Users className="w-6 h-6 text-accent" />
        </div>
      </div>
             <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  );
};

export default CTASection;
