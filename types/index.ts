export type Category = 
  | 'Air Conditioners'
  | 'Refrigerators'
  | 'Fans'
  | 'Electric Kitchen Appliances'
  | 'Air Coolers'
  | 'Batteries'
  | 'Inverters';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  image: string;
  description: string;
  sellingPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  stock: number;
  warranty: string;
  specifications: Record<string, string>;
  deliveryInfo: string;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  mobile: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  email?: string;
  instructions?: string;
  items: { productId: string; productName: string; price: number; quantity: number }[];
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface ServiceBooking {
  id: string;
  customerName: string;
  mobile: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  applianceType: string;
  brand: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  requestType: 'Normal' | 'Emergency';
  status: 'Received' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedTechnician?: string;
  createdAt: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  enquiryType: 'Product Price' | 'Product Availability' | 'Bulk Orders' | 'Warranty' | 'Repair Services' | 'Delivery' | 'Other';
  productName?: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface BusinessSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  serviceAreas: string;
  openingHours: string;
  deliveryCharges: number;
  announcementBanner: string;
  bannerActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
