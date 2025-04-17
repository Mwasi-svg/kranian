export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isExportable: boolean;
  inStock: boolean;
  featured?: boolean;
}

const products: Product[] = [
  // Bouquets
  {
    id: 'bouquet-1',
    name: 'Spring Delight',
    category: 'bouquets',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1561181286-d5c92b900f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A vibrant mix of spring flowers including tulips, daffodils, and hyacinths.',
    isExportable: true,
    inStock: true,
    featured: true
  },
  {
    id: 'bouquet-2',
    name: 'Romantic Blush',
    category: 'bouquets',
    price: 55.99,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Elegant arrangement of pink and white roses with eucalyptus accents.',
    isExportable: true,
    inStock: true
  },
  {
    id: 'bouquet-3',
    name: 'Rustic Charm',
    category: 'bouquets',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Wildflowers and seasonal blooms in a rustic arrangement.',
    isExportable: false,
    inStock: true
  },
  
  // Roses
  {
    id: 'rose-1',
    name: 'Classic Red Roses',
    category: 'roses',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Dozen premium long-stem red roses, a timeless symbol of love.',
    isExportable: true,
    inStock: true,
    featured: true
  },
  {
    id: 'rose-2',
    name: 'White Elegance',
    category: 'roses',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1558652083-2f9f9bd25e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Pure white roses symbolizing innocence and new beginnings.',
    isExportable: true,
    inStock: true
  },
  {
    id: 'rose-3',
    name: 'Sunset Gradient',
    category: 'roses',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Stunning gradient roses in sunset hues of orange, yellow, and pink.',
    isExportable: true,
    inStock: false
  },
  
  // Herbs
  {
    id: 'herb-1',
    name: 'Culinary Herb Set',
    category: 'herbs',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Set of 5 essential culinary herbs: basil, rosemary, thyme, oregano, and mint.',
    isExportable: false,
    inStock: true,
    featured: true
  },
  {
    id: 'herb-2',
    name: 'Lavender Bundle',
    category: 'herbs',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Fragrant lavender bundle, perfect for aromatherapy and decoration.',
    isExportable: true,
    inStock: true
  },
  {
    id: 'herb-3',
    name: 'Medicinal Herb Collection',
    category: 'herbs',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Collection of medicinal herbs including chamomile, echinacea, and lemon balm.',
    isExportable: true,
    inStock: true
  },
  
  // Vegetables
  {
    id: 'veg-1',
    name: 'Seasonal Vegetable Box',
    category: 'vegetables',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Box of seasonal, locally grown organic vegetables.',
    isExportable: false,
    inStock: true,
    featured: true
  },
  {
    id: 'veg-2',
    name: 'Heirloom Tomato Collection',
    category: 'vegetables',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Assortment of colorful heirloom tomatoes, bursting with flavor.',
    isExportable: false,
    inStock: true
  },
  {
    id: 'veg-3',
    name: 'Gourmet Salad Mix',
    category: 'vegetables',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Fresh mix of gourmet salad greens, ready to enjoy.',
    isExportable: false,
    inStock: true
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
export const getProductById = (id: string) => products.find(product => product.id === id);
export const getAllProducts = () => products;

export default products;