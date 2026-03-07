import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import ApiDocs from "./pages/ApiDocs";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundCancellation from "./pages/RefundCancellation";
import ShippingDelivery from "./pages/ShippingDelivery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-cancellation" element={<RefundCancellation />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
