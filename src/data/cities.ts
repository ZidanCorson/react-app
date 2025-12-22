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

export const cityItineraries: { [key: string]: { day: number; title: string; activities: string[] }[] } = {
  "New York": [
    { day: 1, title: "Iconic Sights", activities: ["Statue of Liberty morning tour", "Walk the High Line", "Sunset at Top of the Rock"] },
    { day: 2, title: "Culture & Arts", activities: ["Metropolitan Museum of Art", "Lunch in Central Park", "Broadway Show in the evening"] },
    { day: 3, title: "Urban Exploration", activities: ["Explore SoHo boutiques", "Walk across Brooklyn Bridge", "Dinner in DUMBO"] }
  ],
  "San Francisco": [
    { day: 1, title: "Bay Area Classics", activities: ["Ride the Cable Cars", "Fisherman's Wharf & Pier 39", "Alcatraz Night Tour"] },
    { day: 2, title: "Nature & Views", activities: ["Golden Gate Bridge walk", "Muir Woods Redwoods", "Sausalito ferry ride"] },
    { day: 3, title: "City Vibes", activities: ["Explore Chinatown", "Mission District murals", "Twin Peaks sunset"] }
  ],
  "Tokyo": [
    { day: 1, title: "Old & New", activities: ["Senso-ji Temple in Asakusa", "Tokyo Skytree views", "Dinner in Shinjuku"] },
    { day: 2, title: "Pop Culture", activities: ["Harajuku fashion street", "Meiji Shrine", "Shibuya Crossing & Hachiko"] },
    { day: 3, title: "Tech & Art", activities: ["TeamLab Borderless", "Akihabara electronics", "Sushi in Tsukiji Outer Market"] }
  ],
  "Paris": [
    { day: 1, title: "The Classics", activities: ["Eiffel Tower summit", "Seine River Cruise", "Louvre Museum highlights"] },
    { day: 2, title: "Artistic Soul", activities: ["Montmartre & Sacré-Cœur", "Musée d'Orsay", "Latin Quarter cafes"] },
    { day: 3, title: "Royal Paris", activities: ["Palace of Versailles day trip", "Shopping on Champs-Élysées", "Arc de Triomphe"] }
  ],
  "London": [
    { day: 1, title: "Royal London", activities: ["Buckingham Palace Changing of the Guard", "Westminster Abbey", "London Eye"] },
    { day: 2, title: "History & Markets", activities: ["Tower of London", "Borough Market lunch", "Tate Modern"] },
    { day: 3, title: "Museums & Parks", activities: ["British Museum", "Covent Garden street performers", "Afternoon Tea at The Ritz"] }
  ],
  "Marrakech": [
    { day: 1, title: "Medina Magic", activities: ["Jemaa el-Fnaa square", "Koutoubia Mosque", "Souk shopping"] },
    { day: 2, title: "Gardens & Palaces", activities: ["Majorelle Garden", "Bahia Palace", "Yves Saint Laurent Museum"] },
    { day: 3, title: "Desert & Spa", activities: ["Atlas Mountains day trip", "Traditional Hammam spa", "Rooftop dinner"] }
  ],
  "Kyoto": [
    { day: 1, title: "Temple Trail", activities: ["Kinkaku-ji (Golden Pavilion)", "Ryoan-ji Rock Garden", "Arashiyama Bamboo Grove"] },
    { day: 2, title: "Historic Streets", activities: ["Fushimi Inari Shrine hike", "Kiyomizu-dera Temple", "Gion district geisha spotting"] },
    { day: 3, title: "Zen & Tea", activities: ["Nijo Castle", "Philosopher's Path", "Traditional Tea Ceremony"] }
  ],
  "Casablanca": [
    { day: 1, title: "Architectural Wonders", activities: ["Hassan II Mosque tour", "Rick's Café lunch", "Corniche seaside walk"] },
    { day: 2, title: "City Life", activities: ["Place Mohammed V", "Old Medina exploration", "Morocco Mall shopping"] },
    { day: 3, title: "Day Trip", activities: ["Trip to Rabat (Capital)", "Chellah Necropolis", "Kasbah of the Udayas"] }
  ],
  "Beijing": [
    { day: 1, title: "Imperial History", activities: ["Forbidden City", "Tiananmen Square", "Jingshan Park views"] },
    { day: 2, title: "The Great Wall", activities: ["Mutianyu Great Wall hike", "Ming Tombs", "Peking Duck dinner"] },
    { day: 3, title: "Culture & Temples", activities: ["Temple of Heaven", "Summer Palace", "Hutong rickshaw tour"] }
  ]
};

export const cityCuisine: { [key: string]: { dish: string; description: string }[] } = {
  "New York": [
    { dish: "New York Style Pizza", description: "Large, hand-tossed thin crust, often sold in wide slices to go." },
    { dish: "Bagel with Lox", description: "A boiled-then-baked ring of dough, dense and chewy, topped with cream cheese and cured salmon." },
    { dish: "Cheesecake", description: "Rich, dense, and smooth dessert made with cream cheese, eggs, and sugar." }
  ],
  "San Francisco": [
    { dish: "Clam Chowder in Sourdough", description: "Creamy soup with clams served in a hollowed-out loaf of famous SF sourdough bread." },
    { dish: "Mission Burrito", description: "A large tortilla wrapped around rice, beans, meat, salsa, and more." },
    { dish: "Dungeness Crab", description: "Sweet, tender crab meat, often served steamed or roasted with garlic." }
  ],
  "Tokyo": [
    { dish: "Sushi", description: "Vinegared rice accompanied by a variety of ingredients, such as seafood and vegetables." },
    { dish: "Ramen", description: "Wheat noodles served in a meat or fish-based broth, often flavored with soy sauce or miso." },
    { dish: "Tempura", description: "Seafood or vegetables that have been battered and deep fried." }
  ],
  "Paris": [
    { dish: "Croissant", description: "Buttery, flaky, viennoiserie pastry of Austrian origin, named for its historical crescent shape." },
    { dish: "Escargots de Bourgogne", description: "Land snails cooked with garlic butter, chicken stock or wine." },
    { dish: "Macarons", description: "Sweet meringue-based confection made with egg white, icing sugar, granulated sugar, almond meal, and food colouring." }
  ],
  "London": [
    { dish: "Fish and Chips", description: "Hot dish consisting of fried fish in batter, served with chips." },
    { dish: "Sunday Roast", description: "Traditional British main meal that is typically served on Sunday, consisting of roasted meat, roast potato, and accompaniments." },
    { dish: "Full English Breakfast", description: "A substantial traditional breakfast including bacon, eggs, sausages, baked beans, toast, and tea." }
  ],
  "Marrakech": [
    { dish: "Tagine", description: "Slow-cooked savory stew made with sliced meat, poultry or fish together with vegetables or fruit." },
    { dish: "Couscous", description: "Small steamed balls of crushed durum wheat semolina that is traditionally served with a stew spooned on top." },
    { dish: "Mint Tea", description: "Green tea prepared with spearmint leaves and sugar, traditional to the Maghreb region." }
  ],
  "Kyoto": [
    { dish: "Kaiseki Ryori", description: "Traditional multi-course Japanese dinner." },
    { dish: "Yudofu", description: "Tofu simmered in hot water with vegetables." },
    { dish: "Matcha Sweets", description: "Desserts flavored with finely ground powder of specially grown and processed green tea leaves." }
  ],
  "Casablanca": [
    { dish: "Seafood Bastilla", description: "A savory pie made with warqa dough, filled with seafood and vermicelli." },
    { dish: "Grilled Sardines", description: "Fresh sardines grilled with chermoula spices." },
    { dish: "Moroccan Pastries", description: "Sweet treats made with almonds, honey, and orange blossom water." }
  ],
  "Beijing": [
    { dish: "Peking Duck", description: "Dish from Beijing that has been prepared since the imperial era. The meat is characterized by its thin, crisp skin." },
    { dish: "Jiaozi (Dumplings)", description: "Ground meat and/or vegetable filling wrapped into a thinly rolled piece of dough." },
    { dish: "Zhajiangmian", description: "Noodles topped with a thick sauce made of fried pork and fermented soybean paste." }
  ]
};

