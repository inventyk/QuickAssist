import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppRole, AppUser, Booking, BookingStatus, HelperProfile, SupportTicket } from '../models/platform';
import type { ServiceCategory } from '../../features/services/data/services';
type NewBooking = Omit<Booking, 'id' | 'status' | 'createdAt' | 'helperName'>;
type StoreValue = {
  user: AppUser | null; bookings: Booking[]; helpers: HelperProfile[]; tickets: SupportTicket[];
  priceOverrides: Partial<Record<ServiceCategory, number>>; membershipByEmail: Record<string, string>;
  login: (role: AppRole, name?: string, email?: string) => void; logout: () => void;
  createBooking: (booking: NewBooking) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, helperName?: string) => void;
  updatePrice: (category: ServiceCategory, price: number) => void;
  setMembership: (email: string, planId: string) => void;
  addTicket: (subject: string, message: string) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  setHelperOnline: (id: string, online: boolean) => void;
  setHelperVerified: (id: string, verified: boolean) => void;
};
const initialBookings: Booking[] = [
 { id:'QA-1001', customerName:'Ananya Shah', customerEmail:'ananya@example.com', category:'grocery', serviceTitle:'Grocery & Essentials', description:'Pick up weekly grocery essentials from the nearby store.', pickupAddress:'Koregaon Park, Pune', dropoffAddress:'Kalyani Nagar, Pune', scheduledFor:'Today · 5:30 PM', distanceKm:2.8, estimatedMinutes:30, quote:129, status:'finding_helper', createdAt:new Date().toISOString(), urgency:'standard' },
 { id:'QA-1002', customerName:'Rohan Mehta', customerEmail:'rohan@example.com', category:'documents', serviceTitle:'Document Assistance', description:'Collect a sealed document envelope and deliver it.', pickupAddress:'Viman Nagar, Pune', dropoffAddress:'Yerawada, Pune', scheduledFor:'Today · 6:15 PM', distanceKm:3.5, estimatedMinutes:35, quote:124, status:'assigned', helperName:'Rahul Patil', createdAt:new Date().toISOString(), urgency:'standard' },
 { id:'QA-1003', customerName:'Meera Joshi', customerEmail:'meera@example.com', category:'pickup', serviceTitle:'Pickup & Drop', description:'Deliver a small parcel to a nearby address.', pickupAddress:'Aundh, Pune', dropoffAddress:'Baner, Pune', scheduledFor:'Yesterday · 2:00 PM', distanceKm:4, estimatedMinutes:30, quote:104, status:'completed', helperName:'Rahul Patil', createdAt:new Date().toISOString(), urgency:'standard' }
];
const initialHelpers: HelperProfile[] = [
 { id:'H-101', name:'Rahul Patil', email:'helper@quickassist.demo', phone:'+91 90000 00001', zone:'Central Pune', verified:true, online:true, rating:4.9, completedTasks:42, payoutTotal:6840 },
 { id:'H-102', name:'Ayesha Khan', email:'ayesha@example.com', phone:'+91 90000 00002', zone:'East Pune', verified:true, online:false, rating:4.8, completedTasks:28, payoutTotal:4310 },
 { id:'H-103', name:'Dev Kulkarni', email:'dev@example.com', phone:'+91 90000 00003', zone:'West Pune', verified:false, online:false, rating:0, completedTasks:0, payoutTotal:0 }
];
const initialTickets: SupportTicket[] = [
 { id:'SUP-201', subject:'Change delivery time', message:'Customer requested a new delivery window.', customerName:'Ananya Shah', status:'open', createdAt:new Date().toISOString() }
];
const StoreContext = createContext<StoreValue | null>(null);
export function PlatformProvider({ children }: { children: ReactNode }): React.ReactElement {
 const [user,setUser] = useState<AppUser|null>(null);
 const [bookings,setBookings] = useState<Booking[]>(initialBookings);
 const [helpers,setHelpers] = useState<HelperProfile[]>(initialHelpers);
 const [tickets,setTickets] = useState<SupportTicket[]>(initialTickets);
 const [priceOverrides,setPriceOverrides] = useState<Partial<Record<ServiceCategory,number>>>({});
 const [membershipByEmail,setMembershipByEmail] = useState<Record<string,string>>({});
 const login = useCallback((role:AppRole,name?:string,email?:string) => {
  const defaults:Record<AppRole,{name:string;email:string}> = { customer:{name:'Demo Customer',email:'customer@quickassist.demo'}, helper:{name:'Rahul Patil',email:'helper@quickassist.demo'}, admin:{name:'Platform Admin',email:'admin@quickassist.demo'} };
  const selected=defaults[role]; setUser({id:`${role}-demo`,role,name:name?.trim()||selected.name,email:email?.trim()||selected.email});
 },[]);
 const logout=useCallback(()=>setUser(null),[]);
 const createBooking=useCallback((input:NewBooking)=>{const created:Booking={...input,id:`QA-${String(Date.now()).slice(-7)}`,status:'finding_helper',createdAt:new Date().toISOString()};setBookings(current=>[created,...current]);return created;},[]);
 const updateBookingStatus=useCallback((id:string,status:BookingStatus,helperName?:string)=>setBookings(current=>current.map(item=>item.id===id?{...item,status,...(helperName?{helperName}:{})}:item)),[]);
 const updatePrice=useCallback((category:ServiceCategory,price:number)=>setPriceOverrides(current=>({...current,[category]:Math.max(0,Math.round(price))})),[]);
 const setMembership=useCallback((email:string,planId:string)=>setMembershipByEmail(current=>({...current,[email]:planId})),[]);
 const addTicket=useCallback((subject:string,message:string)=>setTickets(current=>[{id:`SUP-${String(Date.now()).slice(-5)}`,subject,message,customerName:user?.name??'Demo Customer',status:'open',createdAt:new Date().toISOString()},...current]),[user]);
 const updateTicketStatus=useCallback((id:string,status:SupportTicket['status'])=>setTickets(current=>current.map(ticket=>ticket.id===id?{...ticket,status}:ticket)),[]);
 const setHelperOnline=useCallback((id:string,online:boolean)=>setHelpers(current=>current.map(helper=>helper.id===id?{...helper,online}:helper)),[]);
 const setHelperVerified=useCallback((id:string,verified:boolean)=>setHelpers(current=>current.map(helper=>helper.id===id?{...helper,verified}:helper)),[]);
 const value=useMemo<StoreValue>(()=>({user,bookings,helpers,tickets,priceOverrides,membershipByEmail,login,logout,createBooking,updateBookingStatus,updatePrice,setMembership,addTicket,updateTicketStatus,setHelperOnline,setHelperVerified}),[user,bookings,helpers,tickets,priceOverrides,membershipByEmail,login,logout,createBooking,updateBookingStatus,updatePrice,setMembership,addTicket,updateTicketStatus,setHelperOnline,setHelperVerified]);
 return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function usePlatform():StoreValue { const context=useContext(StoreContext); if(!context) throw new Error('usePlatform must be used inside PlatformProvider'); return context; }
