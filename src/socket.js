import {io} from 'socket.io-client';
import {useUserStore} from './store/users';
const url = import.meta.env.VITE_SOCKET_SERVER;
//const socket = io(url, {autoConnect: false, transports: ['websocket']});
const socket = io(url, {transports: ['websocket', 'polling'], autoConnect: false});

const connectToSocket = async () => {
  const userStore = useUserStore();
  if (userStore.currentUser) {
    console.log('Connecting to Websocket');
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      socket.auth = {};
      socket.auth.sessionID = sessionID;
      socket.auth.user = userStore.currentUser;
    } else {
      socket.auth = {};
      socket.auth.user = userStore.currentUser;
    }
    socket.connect();
  } else {
    console.log('Unable to connect to websocket');
  }
  // Set a socket listener to get users and handle it
  socket.on('users', (users) => {
    console.log('Getting users');
    users.forEach((user) => {
      if (user.userId === socket.userId) {
        if (!('messages' in user)) {
          user.messages = [];
        }

        user.self = true;
      } else {
        if (!('messages' in user)) {
          user.messages = [];
        }
        user.self = false;
      }
    });
    userStore.activeUsers = users;
  });
};

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export {socket, connectToSocket};
