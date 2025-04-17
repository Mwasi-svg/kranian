export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'bouquets',
    name: 'Bouquets',
    image: 'https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted bouquets for every occasion'
  },
  {
    id: 'roses',
    name: 'Roses',
    image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Premium roses in various colors'
  },
  {
    id: 'herbs',
    name: 'Herbs',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Fresh culinary and medicinal herbs'
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Organic, locally grown vegetables'
  }
];

export default categories;