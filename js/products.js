// Product Data
const products = [
    {
        id: 1,
        name: "Wash & Shine",
        price: 24.99,
        description: "Kant-en-klare auto reiniger voor een perfecte wasbeurt. Geschikt voor alle laktypes.",
        category: "exterior",
        emoji: "🧼",
        badge: "Bestseller",
        features: ["Kant-en-klaar product", "Veilig voor alle laktypes", "Glansversterkend", "Biologisch afbreekbaar"]
    },
    {
        id: 2,
        name: "Pre-Wash Degreaser",
        price: 19.99,
        description: "Krachtige ontvetter voor hardnekkig vuil. Ideaal voor de voorbehandeling van je auto.",
        category: "exterior",
        emoji: "💪",
        badge: null,
        features: ["Krachtige ontvetter", "Verwijdert vet en olie", "Veilig voor rubber en kunststof", "Concentraat"]
    },
    {
        id: 3,
        name: "Wheel Cleaner",
        price: 14.99,
        description: "Alkalische velgenreiniger voor alle velgtypes. Verwijdert remstof moeiteloos.",
        category: "exterior",
        emoji: "🔩",
        badge: null,
        features: ["Geschikt voor alle velgen", "Verwijdert remstof", "Zuurvrij", "Dieptereiniging"]
    },
    {
        id: 4,
        name: "Interior Cleaner",
        price: 17.99,
        description: "Interieur reiniger - Nieuw! Alles-in-één oplossing voor het interieur van je auto.",
        category: "interior",
        emoji: "🪑",
        badge: "Nieuw",
        features: ["Voor alle interieurmaterialen", "Verwijdert vlekken", "Frisse geur", "Antistatisch"]
    },
    {
        id: 5,
        name: "Glass Cleaner",
        price: 12.99,
        description: "Ruitenreiniger - Nieuw! Streepvrij resultaat op alle glasoppervlakken.",
        category: "interior",
        emoji: "🪟",
        badge: "Nieuw",
        features: ["Streepvrij resultaat", "Ammoniakvrij", "Veilig voor tint", "Binnen en buiten"]
    },
    {
        id: 6,
        name: "Protection Spray",
        price: 29.99,
        description: "Beschermlaag spray - Nieuw! Langdurige bescherming met een eenvoudige applicatie.",
        category: "protection",
        emoji: "🛡️",
        badge: "Nieuw",
        features: ["3 maanden bescherming", "Hydrofoob effect", "UV-bescherming", "Snelle applicatie"]
    }
];

// Format price as Euro
function formatPrice(price) {
    return '€' + price.toFixed(2).replace('.', ',');
}

// Get featured products (first 3)
function getFeaturedProducts() {
    return products.slice(0, 3);
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Get related products (excluding current)
function getRelatedProducts(currentId, limit = 3) {
    return products.filter(p => p.id !== parseInt(currentId)).slice(0, limit);
}