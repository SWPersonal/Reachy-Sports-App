import React from 'react';
import { withNavigation } from 'react-navigation';
import GroupChat from '../../../components/GroupChat';

const AthleticsChat = ({ navigation }) => {
  const groupId = navigation.getParam("groupId");

  return (
    <GroupChat groupId={groupId} />
  )
}

export default withNavigation(AthleticsChat);
