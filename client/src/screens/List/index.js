import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Input, FAB, Image } from '@rneui/base';
import MessageItem from './components/MessageItem';
import { useListContext } from '../../context/List';
import { sendMessage, getMessage } from '../../services/List';

const List = () => {
  const screenHeight = Dimensions.get('screen').height - 90;
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastPost, setLastPost] = useState(false);
  const [skip, setSkip] = useState(0);
  const listContext = useListContext();
  const inputRef = useRef();
  const { pageSize } = listContext.state;

  const getAllMessages = useCallback(() => {
    getMessage(0).then(({ data }) => {
      setLastPost(false);
      setSkip(1);
      setMessages(data.messages);
    });
  }, [messages]);

  const getMoreMessage = async () => {
    if (!lastPost) {
      await getMessage(skip).then(({ data }) => {
        const dataSize = data.messages.length;

        if (dataSize) {
          if (pageSize === dataSize) {
            setSkip(skip + 1);
          } else {
            setLastPost(true);
          }
          return setMessages([...data.messages, ...messages]);
        } else {
          setLastPost(true);
          return null;
        }
      });
    } else {
      return null;
    }
  };

  const postMessage = async () => {
    await sendMessage({ content: messageContent, fromSelf: 1 });
    getAllMessages();
    setMessageContent('');

    inputRef.current.focus();

    setTimeout(async () => {
      await sendMessage({ content: messageContent, fromSelf: 0 });
      getAllMessages();
    }, 1000);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <View>
      <View style={{ height: screenHeight }}>
        <SafeAreaView className="flex">
          <View className="flex flex-row bg-white w-full items-center  ">
            <Image
              width={150}
              height={50}
              source={{
                uri: 'https://uploads-ssl.webflow.com/612381c75233fd1ece6495d7/61978f7cc90168e5b9532920_MB_logo_horizontal_color.png',
              }}
              style={{ width: 150, height: 50, marginHorizontal: 8 }}
              resizeMode={'contain'}
            />
          </View>

          {messages.length ? (
            <FlatList
              style={{ height: 650, flexGrow: 0 }}
              data={messages}
              renderItem={item => <MessageItem message={item} key={item} />}
              keyExtractor={(item, index) => `${item._id}_${index}`}
              contentContainerStyle={{ flexDirection: 'column-reverse' }}
              onEndReached={getMoreMessage}
              onEndReachedThreshold={0.2}
              bounces={false}
              enableAutoscrollToTop={false}
              inverted
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

        <View className="flex justify-center">
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
