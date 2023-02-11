import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Input, FAB, Image } from '@rneui/base';
import MessageItem from './components/MessageItem';
import { sendMessage, getMessage } from '../../services/List';
import ToastComponent from '../../components/ToastComponent';

const List = ({ navigation }) => {
  const screenHeight = Dimensions.get('screen').height - 90;
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const toastRef = useRef();
  const getAllMessages = useCallback(() => {
    setLoading(true);
    getMessage().then(({ data }) => {
      setMessages(data);
      setLoading(false);
    });
  }, []);

  const postMessage = async () => {
    await sendMessage({ content: messageContent, fromSelf: 1 });
    getAllMessages();
    setMessageContent('');
    inputRef.current.focus();
    setTimeout(async () => {
      await sendMessage({ content: messageContent, fromSelf: 0 });
      getAllMessages();
      toastRef.current.showToast({ type: 'error', text: messageContent });
    }, 1000);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <View>
      <View style={{ height: screenHeight }}>
        <SafeAreaView className="flex">
          <View className="flex flex-row bg-zinc-400 w-full items-center  ">
            <Image
              width={150}
              height={50}
              source={{
                uri: 'https://uploads-ssl.webflow.com/612381c75233fd1ece6495d7/61978f7cc90168e5b9532920_MB_logo_horizontal_color.png',
              }}
              style={{ width: 150, height: 50, marginHorizontal: 8 }}
              resizeMode={'contain'}
            />
            <Text className="text-lg mx-3"> Canlı Destek</Text>
          </View>
          {messages.length ? (
            <FlatList
              style={{ height: 650, flexGrow: 0 }}
              data={messages}
              renderItem={item => <MessageItem message={item} />}
              onEndReachedThreshold={0.2}
              onEndReached={() => getAllMessages()}
              keyExtractor={item => item._id}
              inverted
              contentContainerStyle={{ flexDirection: 'column-reverse' }}
            />
          ) : (
            <></>
          )}
        </SafeAreaView>
      </View>

      <View className="flex flex-2 flex-row mx-1 items-center">
        <View className="flex  flex-1 flex-row">
          <Input
            ref={inputRef}
            placeholder="Bir mesaj yazın"
            value={messageContent}
            renderErrorMessage={false}
            onSubmitEditing={postMessage}
            inputContainerStyle={styles.inputContainer}
            onChangeText={text => setMessageContent(text)}
          />
        </View>

        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <FAB
            visible={true}
            icon={{ name: 'send', color: 'white' }}
            color="#0b65a3"
            size="large"
            onPress={() => postMessage()}
          />
        </View>
      </View>
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
