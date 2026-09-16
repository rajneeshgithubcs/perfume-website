export const perfumes = [
  {
    id: 1,
    name: "Lucky Tender",
    tagline: "Sea of Perfumes",
    description: "An invigorating blend of fresh citrus, delicate florals, and warm woody undertones. For the modern man who embraces every moment with confidence.",
    concentration: "Eau de Parfum",
    category: "Fresh Woody Citrus",
    gender: "Men",
    ageRange: "20-45",
    timeToWear: ["Day", "Afternoon", "Evening"],
    occasions: ["Casual", "Office", "Date"],
    season: "All Seasons",
    longevity: "6-8 hours",
    sillage: "Moderate",
    price: 120,
    currency: "₹",
    volume: "90 ML / 3 FL. OZ",
    collection: "Casual Collection",
    theme: {
      bg: "#0a0a0a",        // Dark dark gray backdrop to fix bright canvas
      ambient: "#121212",
      fog: "#0a0a0a",
      light: "#fffaf0",
      accent: "#C9A96E",
    },
    bottle: { 
      glassColor: "#2a2622",  // Tinted luxury glass (prevents white blowout)
      liquidColor: "#e8dcc8", 
      capColor: "#111111", 
      neckColor: "#c0c0c0" 
    },
    notes: {
      top: [
        { name: "Bergamot", description: "Bright, sparkling citrus opening", icon: "🍋", color: "#FFD54F", position: [1.6, 0.8, 1.0] },
        { name: "Orange", description: "Juicy, sun-ripened sweetness", icon: "🍊", color: "#FF9800", position: [-1.4, 0.2, 1.2] },
        { name: "Lemon", description: "Zesty, energetic freshness", icon: "🍋", color: "#FFEB3B", position: [0.8, 1.3, -1.0] },
      ],
      heart: [
        { name: "Jasmine", description: "Elegant white floral heart", icon: "🌸", color: "#F8BBD0", position: [-1.2, -0.3, 1.0] },
        { name: "Lotus", description: "Pure aquatic floral serenity", icon: "🪷", color: "#E1BEE7", position: [1.3, -0.5, 0.6] },
      ],
      base: [
        { name: "Sandalwood", description: "Creamy, warm wood foundation", icon: "🪵", color: "#8D6E63", position: [-0.8, -1.2, -0.8] },
        { name: "Musk", description: "Clean, sensual skin scent", icon: "✨", color: "#F5F5F5", position: [1.0, -1.0, -0.6] },
        { name: "Amber", description: "Golden, resinous warmth", icon: "☀️", color: "#FFB300", position: [0.2, -1.4, 0.8] },
      ],
    },
    sideLabels: [
      { title: "FLORAL", desc: "Soft, Elegant\n& Delicate", position: "left-top" },
      { title: "CITRUS", desc: "Bright, Fresh\n& Uplifting", position: "right-top" },
      { title: "AQUATIC", desc: "Clean, Cool\n& Modern", position: "left-bottom" },
      { title: "WOODY", desc: "Warm, Deep\n& Refined", position: "right-bottom" },
    ],
  },
  {
    id: 2,
    name: "Noir Élégance",
    tagline: "The Scent of Midnight",
    description: "A mysterious blend of dark woods and smoky vanilla, crafted for the confident soul who commands every room they enter.",
    concentration: "Eau de Parfum",
    category: "Oriental Woody",
    gender: "Men",
    ageRange: "25-45",
    timeToWear: ["Evening", "Night"],
    occasions: ["Formal", "Date Night", "Black Tie"],
    season: "Winter",
    longevity: "8-10 hours",
    sillage: "Heavy",
    price: 245,
    currency: "₹",
    volume: "100 ML / 3.4 FL. OZ",
    collection: "Exclusive Collection",
    theme: {
      bg: "#0d0c0b",
      ambient: "#0f0e0d",
      fog: "#0d0c0b",
      light: "#ffeedd",
      accent: "#d4af37",
    },
    bottle: { 
      glassColor: "#1f1d1b", 
      liquidColor: "#d4a574", 
      capColor: "#111111", 
      neckColor: "#d4af37" 
    },
    notes: {
      top: [
        { name: "Bergamot", description: "Bright citrus spark", icon: "🍊", color: "#FFD700", position: [1.5, 0.9, 0.8] },
        { name: "Saffron", description: "Exotic golden luxury", icon: "🌾", color: "#FFA500", position: [-1.2, 1.1, -0.6] },
      ],
      heart: [
        { name: "Rose", description: "Velvety romance", icon: "🌹", color: "#FF1744", position: [1.2, 0.1, 1.0] },
        { name: "Oud", description: "Deep resinous wood", icon: "🪵", color: "#8B4513", position: [-1.0, 0.3, 0.9] },
      ],
      base: [
        { name: "Vanilla", description: "Creamy sweetness", icon: "🍦", color: "#F3E5AB", position: [1.0, -1.0, 0.5] },
        { name: "Amber", description: "Warm golden resin", icon: "☀️", color: "#FFBF00", position: [-0.7, -1.2, -0.5] },
      ],
    },
    sideLabels: [
      { title: "SPICY", desc: "Warm, Rich\n& Intense", position: "left-top" },
      { title: "WOODY", desc: "Deep, Smoky\n& Bold", position: "right-top" },
      { title: "ORIENTAL", desc: "Exotic, Sensual\n& Luxurious", position: "left-bottom" },
      { title: "AMBER", desc: "Sweet, Resinous\n& Lingering", position: "right-bottom" },
    ],
  },
]

export const getPerfumeById = (id) => perfumes.find((p) => p.id === id)