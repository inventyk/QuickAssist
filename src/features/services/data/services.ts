export type ServiceCategory =
  | 'grocery'
  | 'pickup'
  | 'documents'
  | 'queue'
  | 'shopping'
  | 'personal'
  | 'elderly'
  | 'other';

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string;
  category: ServiceCategory;
  startingAt: number;
  priceUnit: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Grocery & Essentials',
    shortTitle: 'Grocery pickup',
    description: 'Kirana, medicines and everyday essentials picked up from nearby stores.',
    details: 'Share your shopping list and preferred store. A helper can purchase the listed essentials and bring them to your chosen address. The product bill is separate from the assistance charge.',
    category: 'grocery',
    startingAt: 99,
    priceUnit: 'per standard order',
    tags: ['Shopping bill separate', 'Local stores'],
  },
  {
    id: '2',
    title: 'Pickup & Drop',
    shortTitle: 'Pickup & drop',
    description: 'Local pickup and drop for parcels, keys, forgotten items and permitted packages.',
    details: 'Add pickup and drop locations, package details and preferred timing. The quote depends on route distance, package size and any waiting required.',
    category: 'pickup',
    startingAt: 89,
    priceUnit: 'up to 3 km',
    tags: ['Local routes', 'Distance-based'],
  },
  {
    id: '3',
    title: 'Document Assistance',
    shortTitle: 'Documents',
    description: 'Help with permitted document collection, submission and local delivery.',
    details: 'Get help with routine document errands such as collecting or submitting permitted forms. Original IDs, confidential records and restricted documents require additional checks and may not be accepted.',
    category: 'documents',
    startingAt: 89,
    priceUnit: 'local task',
    tags: ['Permitted documents', 'Local delivery'],
  },
  {
    id: '4',
    title: 'Queue Assistance',
    shortTitle: 'Queue help',
    description: 'Time-based waiting assistance for services that permit representative attendance.',
    details: 'Tell us the location, expected waiting duration and the rules of the venue. We only accept queue tasks where waiting on another person’s behalf is allowed.',
    category: 'queue',
    startingAt: 99,
    priceUnit: 'per 30 minutes',
    tags: ['Time-based', 'Venue rules apply'],
  },
  {
    id: '5',
    title: 'Local Shopping',
    shortTitle: 'Local shopping',
    description: 'Help finding and buying specific items from nearby shops.',
    details: 'Share the item, store preference and budget. The helper can assist with the purchase and delivery. The cost of goods is paid separately against the store bill.',
    category: 'shopping',
    startingAt: 119,
    priceUnit: 'per 30 minutes',
    tags: ['Purchase bill separate', 'Nearby shops'],
  },
  {
    id: '6',
    title: 'Personal Errands',
    shortTitle: 'Personal errands',
    description: 'Small everyday tasks that save you an extra trip or a bit of time.',
    details: 'Describe the task in plain language. We review the steps, distance and time required, then share a quote before the task is accepted.',
    category: 'personal',
    startingAt: 129,
    priceUnit: 'per task',
    tags: ['Custom scope', 'Quote before confirmation'],
  },
  {
    id: '7',
    title: 'Elderly Accompaniment',
    shortTitle: 'Elderly support',
    description: 'Basic non-medical accompaniment for visits and everyday outings.',
    details: 'Arrange a helper to accompany an older adult for a local visit or simple errand. This is non-medical assistance and does not replace a caregiver, nurse or emergency service.',
    category: 'elderly',
    startingAt: 199,
    priceUnit: 'per hour',
    tags: ['Non-medical', 'Time-based'],
  },
  {
    id: '8',
    title: 'Other Local Assistance',
    shortTitle: 'Something else',
    description: 'Have a different permitted task in mind? Share the details for review.',
    details: 'Tell us what needs doing, where it needs to happen and when. We review every custom request for feasibility, safety and pricing before confirming.',
    category: 'other',
    startingAt: 99,
    priceUnit: 'after review',
    tags: ['Custom request', 'Subject to review'],
  },
];
