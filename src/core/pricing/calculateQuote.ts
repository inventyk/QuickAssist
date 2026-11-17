import { taskPricing } from '../../config/pricing.config';
import type { ServiceCategory } from '../../features/services/data/services';
export type QuoteBreakdown = { base: number; distance: number; time: number; items: number; priority: number; total: number };
const EXTRA_KM_RATE = 15;
const EXTRA_HALF_HOUR_RATE = 35;
const EXTRA_ITEM_RATE = 10;
const PRIORITY_FEE = 40;
export function calculateQuote(category: ServiceCategory, distanceKm: number, estimatedMinutes: number, itemCount = 1, priority = false, priceOverrides: Partial<Record<ServiceCategory, number>> = {}): QuoteBreakdown {
  const base = priceOverrides[category] ?? taskPricing.find((item) => item.serviceId === category)?.startingAt ?? 99;
  const extraDistance = Math.max(0, Math.ceil(distanceKm - 3));
  const extraTimeBlocks = Math.max(0, Math.ceil((estimatedMinutes - 30) / 30));
  const extraItems = category === 'grocery' || category === 'shopping' ? Math.max(0, itemCount - 5) : 0;
  const distance = category === 'queue' ? 0 : extraDistance * EXTRA_KM_RATE;
  const time = ['queue', 'elderly', 'shopping', 'personal'].includes(category) ? extraTimeBlocks * EXTRA_HALF_HOUR_RATE : extraTimeBlocks * Math.round(EXTRA_HALF_HOUR_RATE * 0.5);
  const items = extraItems * EXTRA_ITEM_RATE;
  const priorityFee = priority ? PRIORITY_FEE : 0;
  return { base, distance, time, items, priority: priorityFee, total: base + distance + time + items + priorityFee };
}
