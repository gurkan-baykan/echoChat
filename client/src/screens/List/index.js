import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Dimensions, FlatList, Text } from 'react-native';
import { Input, FAB } from '@rneui/base';
import MessageItem from './components/MessageItem';
import { sendMessage, getMessage } from '../../services/List';
import { styled } from 'nativewind';

const List = ({ navigation }) => {
  const screenHeight = Dimensions.get('screen').height - 200;
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);

  const getAllMessages = useCallback(() => {
    getMessage().then(({ data }) => {
      console.debug(data);
      setMessages(data);
    });
  }, []);

  const postMessage = async () => {
    await sendMessage({ content: messageContent, fromSelf: 1 });

    await sendMessage({ content: messageContent, fromSelf: 0 });
    setMessageContent('');
    getAllMessages();
  };
  useEffect(() => {
    getAllMessages();
  }, []);
  const StyledView = styled(View);
  return (
    <View>
      <View style={{ height: screenHeight }}>
        <SafeAreaView className="flex">
          {messages.length ? (
            <FlatList
              data={messages}
              renderItem={item => <MessageItem message={item} />}
              keyExtractor={item => item._id}
            />
          ) : (
            <></>
          )}
        </SafeAreaView>
      </View>
      <View className="flex-1 items-center justify-center bg-black">
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StyledView className="flex flex-1 flex-row mx-12 ">
        <StyledView className="flex flex-5 flex-row bg-white border-rad rounded-lg mx-8">
          <Input
            value={messageContent}
            renderErrorMessage={false}
            inputStyle={{ width: 200 }}
            inputContainerStyle={{ borderBottomWidth: 0, height: 50 }}
            onChangeText={text => setMessageContent(text)}
          />
        </StyledView>

        <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FAB
            visible={true}
            icon={{ name: 'send', color: 'white' }}
            color="blue"
            onPress={() => postMessage()}
          />
        </View>
      </StyledView>
    </View>
  );
};
export default List;
