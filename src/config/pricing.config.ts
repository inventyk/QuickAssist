export type PricingItem = {
  serviceId: string;
  startingAt: number;
  unit: string;
  note: string;
};

export type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

export const taskPricing: PricingItem[] = [
  { serviceId: 'grocery', startingAt: 99, unit: 'per order', note: 'A standard local pickup; shopping bill is separate.' },
  { serviceId: 'pickup', startingAt: 89, unit: 'up to 3 km', note: 'Longer routes and waiting time may change the quote.' },
  { serviceId: 'documents', startingAt: 89, unit: 'local delivery', note: 'For permitted documents and local destinations.' },
  { serviceId: 'queue', startingAt: 99, unit: 'per 30 minutes', note: 'Only where waiting on another person’s behalf is permitted.' },
  { serviceId: 'shopping', startingAt: 119, unit: 'per 30 minutes', note: 'Item cost and store charges are separate.' },
  { serviceId: 'personal', startingAt: 129, unit: 'per task', note: 'Final price depends on the steps and time required.' },
  { serviceId: 'elderly', startingAt: 199, unit: 'per hour', note: 'Non-medical accompaniment; transport costs are separate.' },
  { serviceId: 'other', startingAt: 99, unit: 'after review', note: 'We confirm scope and price before accepting the request.' },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    tagline: 'For occasional help',
    benefits: ['Priority customer support', 'Save preferred addresses', 'Easy access to booking history'],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 199,
    tagline: 'For regular users',
    featured: true,
    benefits: ['Everything in Basic', 'Priority helper allocation', 'Member-only offers on selected tasks'],
  },
  {
    id: 'family',
    name: 'Family',
    price: 299,
    tagline: 'For the whole household',
    benefits: ['Everything in Plus', 'Up to 4 family profiles', 'Shared household task history'],
  },
];

export const pricingDisclosure =
  'Starting prices are indicative. Your final quote may vary with distance, duration, item count, waiting time, urgency and task complexity. Product purchases and transport costs are separate where applicable. A small platform fee is included in the displayed service price and is shown in the final price breakdown before confirmation.';
