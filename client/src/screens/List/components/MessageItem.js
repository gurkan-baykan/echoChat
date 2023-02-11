import React from 'react';
import { ListItem, Icon, Avatar } from '@rneui/themed';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessageItem = ({ message }) => {
  const { item } = message;
  const date = new Date(item.date).toLocaleDateString('tr-TR');
  const time = new Date(item.date).toLocaleTimeString('tr-TR');
  const dateFormat = `${date} ${time}`;

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View style={styles.itemView}>
            <Text>{item.content}</Text>
          </View>

          <View>
            <Text>{dateFormat}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  itemView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  avatarView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    flexBasis: 'auto',
  },
  textView: {
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: 4,
  },
  actionsView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
