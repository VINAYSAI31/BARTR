import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Trade from "./pages/Trade";
import WelcomeScreen from "./components/WelcomeScreen";
import { Analytics } from "@vercel/analytics/react"; // Make sure it's react, not "next"

const queryClient = new QueryClient();

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {showWelcome ? (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        ) : (
          <BrowserRouter>
            <Analytics /> {/* ✅ Place it here inside BrowserRouter */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
