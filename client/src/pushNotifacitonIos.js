import PushNotificationIOS from '@react-native-community/push-notification-ios';

const handleNotificationSchedule = ({ title, message }) => {
  return PushNotificationIOS.scheduleLocalNotification({
    alertTitle: title,
    alertBody: message,
    fireDate: new Date(),
  });
};

const cancelNotification = () => {
  PushNotificationIOS.removeAllPendingNotificationRequests();
};

export { handleNotificationSchedule, cancelNotification };
