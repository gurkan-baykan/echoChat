import PushNotificationIOS from '@react-native-community/push-notification-ios';

const getCorrectDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23);
  date.setMinutes(54);
  return date;
};

const showNotification = ({ title, message }) => {
  PushNotificationIOS.addNotificationRequest({
    title: title,
  });
};

const handleNotificationSchedule = ({ messageId, title, message }) => {
  PushNotificationIOS.addNotificationRequest({
    id: messageId,
    subtitle: message,
    fireDate: getCorrectDate(),
    title: title,
  });
};

const cancelNotification = () => {
  PushNotificationIOS.removeAllPendingNotificationRequests();
};

export { showNotification, handleNotificationSchedule, cancelNotification };
