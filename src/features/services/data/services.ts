export type ServiceCategory = 'grocery' | 'shopping' | 'document' | 'queue' | 'parcel' | 'errand' | 'elderly' | 'other';
export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  startingCharge: number;
}
export const services: Service[] = [
  { id: '1', title: 'Grocery Pickup & Delivery', description: 'A helper picks up groceries from your preferred store and brings them to your door.', category: 'grocery', icon: 'shop', startingCharge: 40 },
  { id: '2', title: 'Local Shopping Assistance', description: 'Get help shopping for clothes, household items, or everyday necessities.', category: 'shopping', icon: 'shop', startingCharge: 40 },
  { id: '3', title: 'Document Pickup & Drop', description: 'A helper collects documents and delivers them to your specified destination.', category: 'document', icon: 'file', startingCharge: 40 },
  { id: '4', title: 'Queue Assistance', description: 'Get assistance with waiting in queues where proxy attendance is permitted.', category: 'queue', icon: 'clock', startingCharge: 40 },
  { id: '5', title: 'Parcel Pickup & Drop', description: 'Arrange local pickup or delivery of permitted parcels.', category: 'parcel', icon: 'package', startingCharge: 40 },
  { id: '6', title: 'Personal Errands', description: 'Get help with simple everyday tasks and local errands.', category: 'errand', icon: 'calendar', startingCharge: 40 },
  { id: '7', title: 'Elderly Accompaniment', description: 'Arrange basic accompaniment and non-medical assistance for older adults.', category: 'elderly', icon: 'user', startingCharge: 40 },
  { id: '8', title: 'Other Local Assistance', description: 'Request other permitted local assistance tasks.', category: 'other', icon: 'more', startingCharge: 40 },
];
