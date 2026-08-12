// Centralized content so copy stays consistent across sections.

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const img = {
  heroCouple:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
  heroPortrait1:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  heroPortrait2:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
  heroPortrait3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  aboutMain:
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop",

  gallery: [
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495434942214-9b525bceea01?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
  ],
  testimonials: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
  ],
  appMockup:
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=700&auto=format&fit=crop",

  // SignupModal ke age-group avatars ke liye (4 alag images)
  girl1:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  girl2:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  girl3:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
  girl4:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
};

export const trustedLogos = [
  "Vogue", "Forbes", "TechCrunch", "Elle", "Mashable", "Cosmopolitan", "The Verge",
];

export const features = [
  {
    icon: "match",
    title: "Smart Match",
    desc: "Our algorithm learns what you actually click with, not just what you swipe on.",
  },
  {
    icon: "verified",
    title: "Verified Profiles",
    desc: "Every profile passes a photo and ID check, so who you see is who you meet.",
  },
  {
    icon: "chat",
    title: "Live Chat",
    desc: "Real-time messaging with read receipts, GIFs, and voice notes built in.",
  },
  {
    icon: "filters",
    title: "Smart Preferences",
    desc: "Filter matches by age, distance, lifestyle habits, and core relationship goals."
  },
  {
    icon: "nearby",
    title: "Nearby Matches",
    desc: "Set your radius and find people who are actually close enough to date.",
  },
  {
    icon: "ai",
    title: "AI Recommendations",
    desc: "Daily curated picks based on your conversations, not just your filters.",
  },
];

export const steps = [
  { title: "Create Account", desc: "Sign up in under two minutes with just your email." },
  { title: "Complete Profile", desc: "Add photos, prompts, and the things you're actually into." },
  { title: "Discover Matches", desc: "Browse curated profiles picked for real compatibility." },
  { title: "Start Chat", desc: "Break the ice with a prompt-based conversation starter." },
  { title: "Meet Safely", desc: "Video call first, then meet in a verified public space." },
];



export const testimonialData = [
  {
    name: "Amara & Kofi",
    location: "Lagos, Nigeria",
    rating: 5,
    review:
      "We matched on a Tuesday and I knew by our third video call. Amare's prompts made it easy to actually talk instead of just swiping.",
    image: img.testimonials[0],
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review:
      "Verified profiles made the biggest difference. I finally felt safe meeting someone I met online for the first time.",
    image: img.testimonials[1],
  },
  {
    name: "Daniel Cho",
    location: "Seoul, South Korea",
    rating: 5,
    review:
      "The AI recommendations actually got better every week. It felt like the app understood my type better than I did.",
    image: img.testimonials[2],
  },
  {
    name: "Isla & Marcus",
    location: "London, UK",
    rating: 5,
    review:
      "Engaged after eight months. Amare's nearby matching meant we could actually see each other every week from day one.",
    image: img.testimonials[3],
  },
  {
    name: "Sofia Rossi",
    location: "Milan, Italy",
    rating: 4,
    review:
      "Elegant, calm, and refreshingly free of the noise other apps have. It respects your time and your attention.",
    image: img.testimonials[4],
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    tagline: "Dip a toe in.",
    features: [
      "5 matches per day",
      "Basic profile",
      "Standard chat",
      "Limited filters",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    price: 19,
    period: "month",
    tagline: "For people who mean it.",
    features: [
      "Unlimited matches",
      "See who likes you",
      "Advanced filters",
      "Priority support",
      "Read receipts",
    ],
    cta: "Go Premium",
    popular: true,
  },
  {
    name: "VIP",
    price: 39,
    period: "month",
    tagline: "The full experience.",
    features: [
      "Everything in Premium",
      "AI matchmaker concierge",
      "Verified badge",
      "Profile boost weekly",
      "Exclusive VIP events",
    ],
    cta: "Get VIP",
    popular: false,
  },
]

export const faqs = [
  {
    q: "How does Amare's matching actually work?",
    a: "We combine your stated preferences with how you actually behave in the app — who you message, who you linger on — to refine suggestions daily, using AI recommendations layered on top of smart match filters.",
  },
  {
    q: "Is my profile really verified?",
    a: "Yes. Every member completes a live photo check against their uploaded pictures and an ID verification step before their profile goes live to other members.",
  },
  {
    q: "Can I use Amare for free?",
    a: "Absolutely. The Free plan includes daily matches and standard chat. Premium and VIP unlock unlimited matches, advanced filters, and priority visibility.",
  },
  {
    q: "How do I stay safe meeting someone?",
    a: "We recommend a video call before meeting, and always meeting first in a public place. Your exact location is never shared — only your general area.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, subscriptions can be cancelled anytime from your account settings with no cancellation fee. You'll keep access until the end of your billing period.",
  },
];