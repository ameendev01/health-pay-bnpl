import { 
  Heart,
  ArrowRight,
  CheckCircle,
  Shield,
  CreditCard,
  TrendingUp,
  Users,
  Building2,
  Star,
 
  DollarSign,
  Zap,
  Lock,
  Award,
  Play,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Smile,
  ThumbsUp,
  Target
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// interface LandingPageProps {
//   onGetStarted: () => void;
//   onLogin: () => void;
// }

export default function LandingPage(
  // { onGetStarted, onLogin }: LandingPageProps
) {
  const features = [
    {
      icon: CreditCard,
      title: "Flexible Payment Plans",
      description: "Offer patients 4-12 month payment plans with competitive rates and no hidden fees.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Increase Revenue",
      description: "Boost treatment acceptance rates by 67% with affordable payment options.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "PCI DSS compliant platform with end-to-end encryption and fraud protection.",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Instant Approvals",
      description: "Get patients approved in under 60 seconds with our AI-powered underwriting.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Patient-Friendly",
      description: "Simple application process that patients can complete on any device.",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: Building2,
      title: "Easy Integration",
      description: "Seamlessly integrates with your existing practice management software.",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Martinez",
      role: "Practice Owner",
      clinic: "Sunrise Dental Care",
      content: "HealthPay has transformed our practice. We've seen a 40% increase in treatment acceptance and our patients love the flexible payment options.",
      rating: 5,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Michael Chen",
      role: "Oral Surgeon",
      clinic: "Metro Oral Surgery",
      content: "The integration was seamless and the support team is fantastic. Our cash flow has improved significantly since implementing HealthPay.",
      rating: 5,
      image: "https://images.pexels.com/photos/6627438/pexels-photo-6627438.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Cardiologist",
      clinic: "Heart Health Specialists",
      content: "HealthPay makes expensive procedures accessible to more patients. It's a win-win for everyone involved.",
      rating: 5,
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const patientStories = [
    {
      name: "Maria Rodriguez",
      age: 34,
      treatment: "Dental Implants",
      story: "I thought I'd never be able to afford dental implants. HealthPay made it possible with a payment plan that fit my budget perfectly.",
      image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      savings: "$2,400"
    },
    {
      name: "James Wilson",
      age: 45,
      treatment: "Cardiac Surgery",
      story: "The payment plan gave me peace of mind during my recovery. I could focus on healing instead of worrying about medical bills.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      savings: "$8,500"
    },
    {
      name: "Lisa Chen",
      age: 28,
      treatment: "Orthodontic Treatment",
      story: "As a young professional, the monthly payments made it easy to get the smile I always wanted without breaking the bank.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      savings: "$1,800"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Healthcare Providers", icon: Building2 },
    { value: "$2.4B+", label: "Payments Processed", icon: DollarSign },
    { value: "98.7%", label: "Patient Satisfaction", icon: Smile },
    { value: "67%", label: "Increase in Treatment Acceptance", icon: TrendingUp }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "2.9%",
      period: "per transaction",
      description: "Perfect for small practices",
      features: [
        "Up to 100 transactions/month",
        "Basic reporting",
        "Email support",
        "Standard integration",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "2.4%",
      period: "per transaction",
      description: "Most popular for growing practices",
      features: [
        "Up to 500 transactions/month",
        "Advanced analytics",
        "Priority support",
        "Custom integration",
        "White-label options",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large healthcare systems",
      features: [
        "Unlimited transactions",
        "Enterprise reporting",
        "Dedicated account manager",
        "Custom development",
        "Multi-location support",
        "Advanced security features"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                HealthPay
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors duration-300 font-medium">Features</a>
              <a href="#patients" className="text-gray-600 hover:text-teal-600 transition-colors duration-300 font-medium">Patient Stories</a>
              <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors duration-300 font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors duration-300 font-medium">Pricing</a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                // onClick={onLogin}
                href='/dashboard'
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <button 
                // onClick={onGetStarted}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-teal-200 text-teal-700 text-sm font-semibold shadow-lg">
                <Award className="w-5 h-5 mr-3" />
                Trusted by 10,000+ Healthcare Providers
              </div>
              
              <div className="space-y-8">
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Make Healthcare
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600"> Affordable</span>
                  <br />for Everyone
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Empower your patients with flexible payment plans and boost your practice revenue. 
                  Our HIPAA-compliant platform makes it easy to offer 0% interest financing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    // onClick={onGetStarted}
                    className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                  >
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  <button className="group inline-flex items-center justify-center px-10 py-5 bg-white border-2 border-gray-300 text-gray-700 font-bold text-lg rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </button>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">PCI DSS Certified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">SOC 2 Type II</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Visual with Patient Images */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Payment Plan Setup</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Treatment Cost</span>
                      <span className="font-bold text-lg">$3,200</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">Down Payment</span>
                      <span className="font-bold text-lg">$200</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <span className="text-teal-700 font-medium">Monthly Payment</span>
                      <span className="font-bold text-xl text-teal-600">$250</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-700 font-medium">12 months at 0% APR</span>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                    Approve Instantly ⚡
                  </button>
                </div>
              </div>
              
              {/* Floating Patient Images */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  width={56}
                  height={56} 
                  src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&fit=crop" 
                  alt="Happy patient"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  width={56}
                  height={56} 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
                  alt="Happy patient"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -left-12 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  width={56}
                  height={56} 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop" 
                  alt="Happy patient"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patient Stories Section */}
      <section id="patients" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full text-blue-700 font-semibold mb-6">
              <Smile className="w-5 h-5 mr-2" />
              Real Patient Success Stories
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transforming Lives Through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Accessible Healthcare</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how HealthPay has helped thousands of patients access the care they need with affordable payment plans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {patientStories.map((story, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gradient-to-r from-teal-500 to-blue-600">
                    <Image
                      width={56}
                      height={56}
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                    <p className="text-gray-600">Age {story.age}</p>
                    <p className="text-sm text-teal-600 font-semibold">{story.treatment}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;{story.story}&quot;
                </blockquote>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">Treatment Completed</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Saved</p>
                    <p className="font-bold text-teal-600">{story.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Read More Success Stories
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-teal-100 rounded-full text-teal-700 font-semibold mb-6">
              <Target className="w-5 h-5 mr-2" />
              Platform Features
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to offer flexible payment solutions 
              while maintaining the highest standards of security and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-semibold mb-6">
              <Users className="w-5 h-5 mr-2" />
              Healthcare Professional Reviews
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Trusted by Healthcare
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Professionals</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how HealthPay is transforming practices across the country
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                  &quot;{testimonial.content}&quot;
                </blockquote>
                
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-teal-600 font-semibold">{testimonial.clinic}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-purple-100 rounded-full text-purple-700 font-semibold mb-6">
              <DollarSign className="w-5 h-5 mr-2" />
              Transparent Pricing
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Pricing</span>
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees, no setup costs. Only pay when you get paid.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-teal-500 shadow-2xl scale-105' 
                  : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-teal-100 mb-12 max-w-3xl mx-auto">
            Join thousands of healthcare providers who trust HealthPay to make treatments accessible and boost revenue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              // onClick={onGetStarted}
              className="group inline-flex items-center justify-center px-10 py-5 bg-white text-teal-600 font-bold text-lg rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Start Your Free Trial
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Schedule Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-teal-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HealthPay</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Making healthcare accessible through flexible payment solutions powered by artificial intelligence.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-300">1-800-HEALTHPAY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-300">support@healthpay.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API Documentation</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Webinars</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 HealthPay. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">PCI DSS Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}