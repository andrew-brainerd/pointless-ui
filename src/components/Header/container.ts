import { connect, ConnectedProps } from 'react-redux';
import { User } from '@auth0/auth0-react';
import { ConnectData } from '../../types/api';
import { connectClient } from '../../actions/pusher';
import { setCurrentUser } from '../../actions/users';
import { loadPool } from '../../actions/pools';
import { displayNotification, loadNotifications } from '../../actions/notify';
import { showSubHeader, hideSubHeader } from '../../actions/config';
import Header from './Header';

const mapDispatchToProps = {
  connectClient: (channel: string, event: string, action: (data: ConnectData) => void) => connectClient(channel, event, action),
  setCurrentUser: (user: User) => setCurrentUser(user),
  notify: (category: string, title: string, message: string, time?: number) => displayNotification(category, title, message, time),
  loadPool: (poolId: string) => loadPool(poolId),
  showSubHeader: () => showSubHeader(),
  hideSubHeader: () => hideSubHeader(),
  loadNotifications: (userEmail: string, showLoading: boolean) => loadNotifications(userEmail, showLoading)
};

const connector = connect(null, mapDispatchToProps);

export type HeaderProps = ConnectedProps<typeof connector>;

export default connector(Header);
