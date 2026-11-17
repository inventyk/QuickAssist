import React,{useState} from 'react';
import {WorkspaceFrame,NavItem} from '../../components/app/WorkspaceFrame';
import {usePlatform} from '../../core/state/PlatformProvider';
import type {ServiceCategory} from '../services/data/services';
import {CustomerHomeScreen} from './screens/CustomerHomeScreen';
import {CustomerServicesScreen} from './screens/CustomerServicesScreen';
import {CustomerBookingScreen} from './screens/CustomerBookingScreen';
import {CustomerBookingsScreen} from './screens/CustomerBookingsScreen';
import {CustomerMembershipScreen} from './screens/CustomerMembershipScreen';
import {CustomerProfileScreen} from './screens/CustomerProfileScreen';
const nav:NavItem[]=[{key:'home',label:'Home',icon:'⌂'},{key:'services',label:'Services',icon:'▦'},{key:'bookings',label:'Bookings',icon:'▣'},{key:'membership',label:'Membership',icon:'♛'},{key:'profile',label:'Profile',icon:'◉'}];
type Props={onSwitchRole:()=>void};
export function CustomerWorkspace({onSwitchRole}:Props):React.ReactElement{
 const {user,logout,bookings}=usePlatform();const [page,setPage]=useState('home');const [category,setCategory]=useState<ServiceCategory>('grocery');
 const goBook=(value:ServiceCategory)=>{setCategory(value);setPage('book');};
 const ownActive=bookings.filter(b=>b.customerEmail===user?.email&&!['completed','cancelled'].includes(b.status)).length;
 return <WorkspaceFrame role="customer" name={user?.name??'Customer'} activeKey={page==='book'?'services':page} navItems={nav} onNavigate={setPage} onSwitchRole={onSwitchRole} onLogout={logout}>
  {page==='home'?<CustomerHomeScreen name={user?.name??'Customer'} activeCount={ownActive} onBook={goBook} onNavigate={setPage}/>:page==='services'?<CustomerServicesScreen onBook={goBook}/>:page==='book'?<CustomerBookingScreen initialCategory={category} onDone={()=>setPage('bookings')} onCancel={()=>setPage('services')}/>:page==='bookings'?<CustomerBookingsScreen/>:page==='membership'?<CustomerMembershipScreen/>:<CustomerProfileScreen/>}
 </WorkspaceFrame>;
}
