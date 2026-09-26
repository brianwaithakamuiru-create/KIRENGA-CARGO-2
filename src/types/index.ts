export type UserRole =
  | 'admin'
  | 'operations'
  | 'dispatch'
  | 'logistics'
  | 'finance'
  | 'documentation'
  | 'fleet'
  | 'support'
  | 'hr'
  | 'driver'
  | 'customer';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  photoURL?: string;
  mustChangePassword?: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  cargoDescription: string;
  cargoWeight: number;
  cargoVolume?: number;
  cargoType: string;
  preferredDate: string;
  specialInstructions?: string;
  status: BookingStatus;
  quotedPrice?: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export type ShipmentStatus =
  | 'BOOKED'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'ACCEPTED'
  | 'ARRIVED_AT_PICKUP'
  | 'LOADING'
  | 'LOADED'
  | 'DEPARTED'
  | 'IN_TRANSIT'
  | 'CHECKPOINT'
  | 'ARRIVED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Shipment {
  id: string;
  bookingId: string;
  trackingNumber: string;
  customerId: string;
  customerName: string;
  origin: string;
  destination: string;
  cargoDescription: string;
  cargoWeight: number;
  status: ShipmentStatus;
  driverId?: string;
  driverName?: string;
  vehicleId?: string;
  vehiclePlate?: string;
  routeId?: string;
  currentLocation?: {
    lat: number;
    lng: number;
    address?: string;
    updatedAt: string;
  };
  checkpoints: Checkpoint[];
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  arrivedAt?: string;
  departedAt?: string;
  notes?: string;
  status: 'pending' | 'arrived' | 'departed' | 'skipped';
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: 'truck' | 'van' | 'trailer' | 'pickup';
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  currentDriverId?: string;
  lastServiceDate?: string;
  nextServiceDate?: string;
  mileage?: number;
  images?: string[];
  documents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: 'available' | 'on_trip' | 'off_duty' | 'suspended';
  currentVehicleId?: string;
  currentShipmentId?: string;
  rating?: number;
  totalTrips?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  assignedBy: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  relatedTo?: {
    type: 'booking' | 'shipment' | 'vehicle' | 'other';
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
  createdAt: string;
}

export interface BrandingSettings {
  companyName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  supportEmail: string;
  supportPhone: string;
  address?: string;
}
