import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

export interface Props {
    state: Object,
    navigation: Object
}

export interface PropsIcon {
    props: Object
}

const PersonIcon: React.FC<PropsIcon> = props => (
    <Icon {...props} name='person-outline'/>
);

const BookIcon: React.FC<PropsIcon> = props => (
    <Icon {...props} name='book-open-outline'/>
)

const BottomTabBar: React.FC<Props> = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='FEED' icon={BookIcon}/>
      <BottomNavigationTab title='PROFILE' icon={PersonIcon}/>
    </BottomNavigation>
  );

export default BottomTabBar;