import type { ServiceCategory } from '../../features/services/data/services';
export type AppRole = 'customer' | 'helper' | 'admin';
export type BookingStatus = 'requested' | 'finding_helper' | 'assigned' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
export type AppUser = { id: string; name: string; email: string; role: AppRole };
export type Booking = { id: string; customerName: string; customerEmail: string; category: ServiceCategory; serviceTitle: string; description: string; pickupAddress: string; dropoffAddress: string; scheduledFor: string; distanceKm: number; estimatedMinutes: number; quote: number; status: BookingStatus; helperName?: string; createdAt: string; urgency: 'standard' | 'priority' };
export type HelperProfile = { id: string; name: string; email: string; phone: string; zone: string; verified: boolean; online: boolean; rating: number; completedTasks: number; payoutTotal: number };
export type SupportTicket = { id: string; subject: string; message: string; customerName: string; status: 'open' | 'in_progress' | 'resolved'; createdAt: string };
