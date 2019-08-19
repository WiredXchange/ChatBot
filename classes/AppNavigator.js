import {createStackNavigator, createAppContainer} from 'react-navigation';
import ChatBot from './ChatBot';
import UserProfile from './UserProfile'


const AppNavigator = createStackNavigator(
  {
    ChatBot: {
    screen: ChatBot,
  },
  UserProfile: 
  {
   screen: UserProfile,
  },

  },

  {
  initialRouteName: 'ChatBot',
  }
  );
  export default createAppContainer(AppNavigator);
