export interface Transaction {
  id?: number;
  localId?: string;
  status: 'queue' | 'pending' | 'for processing' | 'processing' | 'approved' | 'rejected' | 'deleted';
  customer: number;
  customer_description: string;
  remarks?: number;
  booking_date: Date;
  created_date: Date;
  items: { id: number, quantity: number, price: number }[];
  geolocation: {
    latitude: number;
    longitude: number;
  },
  customer_review_status?: string;
  inventory_review_status?: string;
  price_review_status?: string;
  unsubmittedChange: boolean;
  agent?: number;
};
