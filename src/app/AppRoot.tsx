import React from 'react';
import {usePlatform} from '../core/state/PlatformProvider';
import {RoleLoginScreen} from '../features/auth/RoleLoginScreen';
import {CustomerWorkspace} from '../features/customer/CustomerWorkspace';
import {HelperWorkspace} from '../features/helper/HelperWorkspace';
import {AdminWorkspace} from '../features/admin/AdminWorkspace';
export function AppRoot():React.ReactElement{
 const {user,login}=usePlatform();
 if(!user)return <RoleLoginScreen onLogin={login}/>;
 if(user.role==='customer')return <CustomerWorkspace onSwitchRole={()=>login('helper','Rahul Patil','helper@quickassist.demo')}/>;
 if(user.role==='helper')return <HelperWorkspace onSwitchRole={()=>login('admin','Platform Admin','admin@quickassist.demo')}/>;
 return <AdminWorkspace onSwitchRole={()=>login('customer','Demo Customer','customer@quickassist.demo')}/>;
}
