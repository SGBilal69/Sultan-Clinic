export type DiseaseCategory = 
  | 'all'
  | 'reproductive_fertility'
  | 'digestive_internal'
  | 'renal_stones'
  | 'skin_hair'
  | 'mind_neuro'
  | 'general_physical';

export interface DiseaseTreatment {
  id: string;
  title: string;
  urduTitle: string;
  category: DiseaseCategory;
  summary: string;
  symptoms: string[];
  homeopathicApproach: string;
  durationEstimate: string;
  dailyCostEstimate: string; // e.g. "Rs. 100 - 200 / day"
  isCurableNaturally: boolean;
  relatedProductId?: string;
}

export type ProductCategory = 
  | 'all'
  | 'courses'
  | 'mens_health'
  | 'womens_health'
  | 'skin_hair'
  | 'digestive_renal';

export interface Product {
  id: string;
  name: string;
  urduName?: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  durationDays?: number;
  dailyCost?: number;
  volumeOrUnit?: string;
  tagline: string;
  description: string;
  benefits: string[];
  dosage: string;
  ingredients: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'easypaisa_jazzcash' | 'bank_transfer' | 'whatsapp';

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  whatsapp: string;
  city: string;
  address: string;
  province: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  customer: OrderCustomerDetails;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  createdAt: string;
  trackingNumber: string;
}

export interface AppointmentData {
  id: string;
  patientName: string;
  phone: string;
  whatsapp: string;
  gender: 'Male' | 'Female' | 'Child';
  age: number | string;
  city: string;
  consultationType: 'in_clinic' | 'online_video';
  diseaseConcern: string;
  preferredDate: string;
  preferredTimeSlot: string;
  symptomsDescription: string;
  createdAt: string;
}
