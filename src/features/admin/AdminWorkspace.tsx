import React,{useState} from 'react';
import {WorkspaceFrame,NavItem} from '../../components/app/WorkspaceFrame';
import {usePlatform} from '../../core/state/PlatformProvider';
import {AdminOverviewScreen} from './screens/AdminOverviewScreen';
import {AdminBookingsScreen} from './screens/AdminBookingsScreen';
import {AdminHelpersScreen} from './screens/AdminHelpersScreen';
import {AdminPricingScreen} from './screens/AdminPricingScreen';
import {AdminSupportScreen} from './screens/AdminSupportScreen';
import {AdminSettingsScreen} from './screens/AdminSettingsScreen';
const nav:NavItem[]=[{key:'overview',label:'Overview',icon:'▦'},{key:'bookings',label:'Bookings',icon:'▣'},{key:'helpers',label:'Helpers',icon:'♙'},{key:'pricing',label:'Pricing',icon:'₹'},{key:'support',label:'Support',icon:'☏'},{key:'settings',label:'Settings',icon:'⚙'}];
type Props={onSwitchRole:()=>void};
export function AdminWorkspace({onSwitchRole}:Props):React.ReactElement{
 const {user,logout}=usePlatform();const [page,setPage]=useState('overview');
 const screens:Record<string,React.ReactNode>={overview:<AdminOverviewScreen onNavigate={setPage}/>,bookings:<AdminBookingsScreen/>,helpers:<AdminHelpersScreen/>,pricing:<AdminPricingScreen/>,support:<AdminSupportScreen/>,settings:<AdminSettingsScreen/>};
 return <WorkspaceFrame role="admin" name={user?.name??'Admin'} activeKey={page} navItems={nav} onNavigate={setPage} onSwitchRole={onSwitchRole} onLogout={logout}>{screens[page]??screens.overview}</WorkspaceFrame>;
}
