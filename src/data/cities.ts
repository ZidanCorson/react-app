export const items = ["New York", "San Francisco", "Tokyo", "Paris", "London", "Marrakech", "Kyoto", "Casablanca", "Beijing"];

export const cityImages: { [key: string]: string[] } = {
  "New York": [
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=300&h=200&fit=crop"
  ],
  "San Francisco": [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1521464302861-ce943915d1c3?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=300&h=200&fit=crop"
  ],
  "Tokyo": [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=300&h=200&fit=crop"
  ],
  "Paris": [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=300&h=200&fit=crop"
  ],
  "London": [
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=300&h=200&fit=crop"
  ],
  "Marrakech": [
    "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&h=200&fit=crop"
  ],
  "Kyoto": [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop"
  ],
  "Casablanca": [
    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1577147443647-81856d5151af?w=300&h=200&fit=crop"
  ],
  "Beijing": [
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=300&h=200&fit=crop"
  ]
};

export const citySuggestions: { [key: string]: string } = {
  "New York": "Visit Central Park, see a Broadway show, and walk across the Brooklyn Bridge.",
  "San Francisco": "Walk across the Golden Gate Bridge, visit Alcatraz, and ride a cable car.",
  "Tokyo": "Visit the Senso-ji Temple, cross the Shibuya Crossing, and explore Akihabara.",
  "Paris": "Visit the Eiffel Tower, explore the Louvre Museum, and walk along the Seine River.",
  "London": "Visit the British Museum, see the Tower of London, and ride the London Eye.",
  "Marrakech": "Explore the Medina souks, visit the Majorelle Garden, and see the Koutoubia Mosque.",
  "Kyoto": "Walk through the Fushimi Inari Shrine, visit the Kinkaku-ji Golden Pavilion, and explore the Arashiyama Bamboo Grove.",
  "Casablanca": "Visit the magnificent Hassan II Mosque, explore the Old Medina, and walk along the Corniche.",
  "Beijing": "Walk the Great Wall, explore the Forbidden City, and visit the Temple of Heaven."
};

export const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "New York": { lat: 40.7128, lng: -74.0060 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Tokyo": { lat: 35.6762, lng: 139.6503 },
  "Paris": { lat: 48.8566, lng: 2.3522 },
  "London": { lat: 51.5074, lng: -0.1278 },
  "Marrakech": { lat: 31.6295, lng: -7.9811 },
  "Kyoto": { lat: 35.0116, lng: 135.7681 },
  "Casablanca": { lat: 33.5731, lng: -7.5898 },
  "Beijing": { lat: 39.9042, lng: 116.4074 }
};

export const cityCurrencies: { [key: string]: { code: string; symbol: string } } = {
  "New York": { code: "USD", symbol: "$" },
  "San Francisco": { code: "USD", symbol: "$" },
  "Tokyo": { code: "JPY", symbol: "¥" },
  "Paris": { code: "EUR", symbol: "€" },
  "London": { code: "GBP", symbol: "£" },
  "Marrakech": { code: "MAD", symbol: "DH" },
  "Kyoto": { code: "JPY", symbol: "¥" },
  "Casablanca": { code: "MAD", symbol: "DH" },
  "Beijing": { code: "CNY", symbol: "¥" }
};

export const cityLanguages: { [key: string]: string } = {
  "New York": "en-US",
  "San Francisco": "en-US",
  "Tokyo": "ja-JP",
  "Paris": "fr-FR",
  "London": "en-GB",
  "Marrakech": "ar-MA",
  "Kyoto": "ja-JP",
  "Casablanca": "ar-MA",
  "Beijing": "zh-CN"
};

export const languagePhrases: { [key: string]: { phrase: string; translation: string; pronunciation?: string }[] } = {
  "en-US": [
    { phrase: "Hello", translation: "Hello" },
    { phrase: "Thank you", translation: "Thank you" },
    { phrase: "How much?", translation: "How much?" }
  ],
  "en-GB": [
    { phrase: "Hello", translation: "Hello" },
    { phrase: "Thank you", translation: "Thank you" },
    { phrase: "How much?", translation: "How much?" }
  ],
  "ja-JP": [
    { phrase: "Hello", translation: "Konnichiwa", pronunciation: "Konnichiwa" },
    { phrase: "Thank you", translation: "Arigato", pronunciation: "Arigato" },
    { phrase: "How much?", translation: "Ikura desu ka?", pronunciation: "Ikura desu ka?" }
  ],
  "fr-FR": [
    { phrase: "Hello", translation: "Bonjour", pronunciation: "Bonjour" },
    { phrase: "Thank you", translation: "Merci", pronunciation: "Merci" },
    { phrase: "How much?", translation: "Combien ça coûte ?", pronunciation: "Combien sa coot?" }
  ],
  "ar-MA": [
    { phrase: "Hello", translation: "Salam", pronunciation: "Salam" },
    { phrase: "Thank you", translation: "Choukran", pronunciation: "Shokran" },
    { phrase: "How much?", translation: "Bchhal?", pronunciation: "Bish-hal?" }
  ],
  "zh-CN": [
    { phrase: "Hello", translation: "Ni hao", pronunciation: "Nee how" },
    { phrase: "Thank you", translation: "Xie xie", pronunciation: "Shieh shieh" },
    { phrase: "How much?", translation: "Duo shao qian?", pronunciation: "Dwo shao chyen?" }
  ]
};

export const cityCostMultipliers: { [key: string]: number } = {
  "New York": 1.8,
  "San Francisco": 1.7,
  "Tokyo": 1.5,
  "Paris": 1.4,
  "London": 1.6,
  "Marrakech": 0.7,
  "Kyoto": 1.3,
  "Casablanca": 0.6,
  "Beijing": 0.9
};

