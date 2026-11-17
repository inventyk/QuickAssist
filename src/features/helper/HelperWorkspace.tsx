import React,{useState} from 'react';
import {WorkspaceFrame,NavItem} from '../../components/app/WorkspaceFrame';
import {usePlatform} from '../../core/state/PlatformProvider';
import {HelperHomeScreen} from './screens/HelperHomeScreen';
import {HelperTasksScreen} from './screens/HelperTasksScreen';
import {HelperEarningsScreen} from './screens/HelperEarningsScreen';
import {HelperProfileScreen} from './screens/HelperProfileScreen';
const nav:NavItem[]=[{key:'home',label:'Home',icon:'⌂'},{key:'tasks',label:'Tasks',icon:'▣'},{key:'earnings',label:'Earnings',icon:'₹'},{key:'profile',label:'Profile',icon:'◉'}];
type Props={onSwitchRole:()=>void};
export function HelperWorkspace({onSwitchRole}:Props):React.ReactElement{
 const {user,logout,bookings}=usePlatform();const [page,setPage]=useState('home');
 const helperBookings=bookings.filter(b=>b.helperName===user?.name||['finding_helper','requested'].includes(b.status));
 return <WorkspaceFrame role="helper" name={user?.name??'Helper'} activeKey={page} navItems={nav} onNavigate={setPage} onSwitchRole={onSwitchRole} onLogout={logout}>
  {page==='home'?<HelperHomeScreen name={user?.name??'Helper'} bookings={helperBookings} onNavigate={setPage}/>:page==='tasks'?<HelperTasksScreen/>:page==='earnings'?<HelperEarningsScreen/>:<HelperProfileScreen/>}
 </WorkspaceFrame>;
}
