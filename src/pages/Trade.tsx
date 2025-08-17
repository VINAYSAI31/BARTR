import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Trade = () => {
  const [formData, setFormData] = useState({
    name: "",
    wantToTrade: "",
    tradeWith: "",
  });
  const { toast } = useToast();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success notification
    toast({
      title: "Trade Request Submitted!",
      description: "Our AI will find you the best pair. Stay tuned!",
      className: "bg-white text-black border border-gray-200",
    });

    // Reset form
    setFormData({
      name: "",
      wantToTrade: "",
      tradeWith: "",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background with similar styling to main page */}
        <div className="absolute inset-0  z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-20">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-secondary/50 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground">
              Start Trading Today
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-primary-foreground">
            Ready to
            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%]">
              Trade?
            </span>
          </h1>
          
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tell us what you want to trade and what you're looking for. Our AI will find the perfect match for you!
          </p>
        </div>
      </section>

      {/* Trade Form Section */}
      <section className="relative py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-background/50 backdrop-blur-sm border border-secondary/30 rounded-2xl p-8 shadow-elegant">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#6366f1] mb-4">
                What Would You Like to Trade?
              </h2>
              <p className="text-primary-foreground/70">
                Fill out the form below and let our AI find you the perfect trading partner
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-2xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%] mb-4 group-[.in-view]:animate-float-sway">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-secondary/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary h-16 text-lg px-6"
                />
              </div>

              {/* What to Trade Field */}
              <div className="space-y-2">
                <Label htmlFor="wantToTrade" className="text-2xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%] mb-4 group-[.in-view]:animate-float-sway">
                  What do you want to trade?
                </Label>
                <Textarea
                  id="wantToTrade"
                  name="wantToTrade"
                  placeholder="Describe what you're offering (e.g., programming skills, design work, tutoring, etc.)"
                  value={formData.wantToTrade}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-background/50 border-secondary/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary resize-none"
                />
              </div>

              {/* Trade With Field */}
              <div className="space-y-2">
                <Label htmlFor="tradeWith" className="text-2xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[size:200%_100%] mb-4 group-[.in-view]:animate-float-sway">
                  What are you looking for in return?
                </Label>
                <Textarea
                  id="tradeWith"
                  name="tradeWith"
                  placeholder="Describe what you're looking for (e.g., help with math, logo design, website development, etc.)"
                  value={formData.tradeWith}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-background/50 border-secondary/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full group shadow-premium"
                >
                  Submit Trade Request
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm">
                  Our AI will analyze your request and find the best possible trading partners from our community.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="relative py-16 ">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6366f1] mb-4">
              How Our AI Trading System Works
            </h2>
            <p className="text-lg  text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI analyzes your trading preferences and finds the perfect matches from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">Submit Your Request</h3>
              <p className="text-primary-foreground/70">
                Tell us what you want to trade and what you're looking for in return
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">AI Analysis</h3>
              <p className="text-primary-foreground/70">
                Our AI analyzes your request and finds the best possible trading partners
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">Get Matched</h3>
              <p className="text-primary-foreground/70">
                Receive notifications about potential matches and start trading
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-background/50 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary-foreground mb-3">
                Ready to Start Trading?
              </h3>
              <p className="text-primary-foreground/70 mb-4">
                Join thousands of students and professionals who are already trading skills and services
              </p>
              <Button
                variant="hero"
                size="lg"
                className="group shadow-premium"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Submit Another Request
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trade;
