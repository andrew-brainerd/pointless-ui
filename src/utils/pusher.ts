import Pusher from 'pusher-js';

const appKey = process.env.REACT_APP_PUSHER_APP_KEY as string;

const pusher = new Pusher(appKey, { cluster: 'us2' });

export const getChannel = (channel: string) => pusher.subscribe(channel);
