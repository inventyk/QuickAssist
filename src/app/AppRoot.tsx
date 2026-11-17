import React from 'react';
import {View,StyleSheet} from 'react-native';
import {usePlatform} from '../core/state/PlatformProvider';
import {RoleLoginScreen} from '../features/auth/RoleLoginScreen';
import {CustomerWorkspace} from '../features/customer/CustomerWorkspace';
import {HelperWorkspace} from '../features/helper/HelperWorkspace';
import {AdminWorkspace} from '../features/admin/AdminWorkspace';
export function AppRoot():React.ReactElement{
 const {user,login}=usePlatform();
 const switchRole=()=>{ // Switching roles returns to the demo role selector; shared in-memory tasks remain available.
  login('customer','Demo Customer','customer@quickassist.demo');
 };
 if(!user)return <RoleLoginScreen onLogin={login}/>;
 if(user.role==='customer')return <CustomerWorkspace onSwitchRole={()=>login('helper','Rahul Patil','helper@quickassist.demo')}/>;
 if(user.role==='helper')return <HelperWorkspace onSwitchRole={()=>login('admin','Platform Admin','admin@quickassist.demo')}/>;
 return <AdminWorkspace onSwitchRole={switchRole}/>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#F4F7F8'}});
