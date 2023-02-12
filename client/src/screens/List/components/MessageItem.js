import React from 'react';
import { View, Text } from 'react-native';

const MessageItem = ({ message }) => {
  const { item } = message;
  const time = new Date(item.date).toLocaleTimeString('tr-TR').slice(0, 5);

  return (
    <View>
      <View
        className={
          item.fromSelf === true
            ? 'flex-column justify-start self-end w-auto  bg-green-600 text-base mb-8 rounded-lg  p-2 m-4'
            : 'flex-column justify-end self-start w-auto  bg-zinc-500 text-base mb-8  rounded-lg  p-2 m-4'
        }
      >
        <View>
          <Text className="text-white">{item.content}</Text>
        </View>
        <View className="flex flex-row justify-end  items-end">
          <Text className="text-white text-right text-xs">{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MessageItem;
