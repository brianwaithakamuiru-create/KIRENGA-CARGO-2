export const APP_NAME = 'KIRENGA CARGO';
export const APP_VERSION = '2.0.0';

export const SHIPMENT_STATUSES = [
  'BOOKED',
  'CONFIRMED',
  'ASSIGNED',
  'ACCEPTED',
  'ARRIVED_AT_PICKUP',
  'LOADING',
  'LOADED',
  'DEPARTED',
  'IN_TRANSIT',
  'CHECKPOINT',
  'ARRIVED',
  'DELIVERED',
  'CANCELLED',
] as const;

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrator',
  operations: 'Operations',
  dispatch: 'Dispatch',
  logistics: 'Logistics',
  finance: 'Finance',
  documentation: 'Documentation',
  fleet: 'Fleet Management',
  support: 'Support',
  hr: 'Human Resources',
  driver: 'Driver',
  customer: 'Customer',
};

export const STATUS_COLORS: Record<string, string> = {
  BOOKED: '#6B6B75',
  CONFIRMED: '#3B82F6',
  ASSIGNED: '#8B5CF6',
  ACCEPTED: '#06B6D4',
  ARRIVED_AT_PICKUP: '#F59E0B',
  LOADING: '#F97316',
  LOADED: '#EAB308',
  DEPARTED: '#84CC16',
  IN_TRANSIT: '#22C55E',
  CHECKPOINT: '#14B8A6',
  ARRIVED: '#10B981',
  DELIVERED: '#22C55E',
  CANCELLED: '#EF4444',
  pending: '#6B6B75',
  confirmed: '#3B82F6',
  cancelled: '#EF4444',
  completed: '#22C55E',
  active: '#22C55E',
  inactive: '#6B6B75',
  available: '#22C55E',
  in_use: '#F59E0B',
  maintenance: '#EF4444',
};
