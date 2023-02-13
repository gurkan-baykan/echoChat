import PushNotificationIOS from '@react-native-community/push-notification-ios';

const showNotification = ({ title, message }) => {
  PushNotificationIOS.localNotification({
    message: message, // (required)
    date: new Date(Date.now() + 60 * 1000), // in 60 secs
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    title: title,
    repeatTime: 1,
  });
};

const handleNotificationSchedule = ({ title, message }) => {
  PushNotificationIOS.localNotificationSchedule({
    message: message, // (required)
    date: new Date(Date.now() + 60 * 1000), // in 60 secs
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    title: title,
    repeatTime: 1,
  });
};

const cancelNotification = () => {
  PushNotificationIOS.cancelAllLocalNotifications();
};

export { showNotification, handleNotificationSchedule, cancelNotification };
