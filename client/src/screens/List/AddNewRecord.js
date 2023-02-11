import React, { useReducer } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Input, Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useListContext } from '../../context/List';

export function reducer(stateData, action) {
  switch (action.type) {
    case 'setName': {
      return {
        ...stateData,
        name: action.payload,
      };
    }
    case 'setJob': {
      return {
        ...stateData,
        job: action.payload,
      };
    }
    case 'setDescription': {
      return {
        ...stateData,
        description: action.payload,
      };
    }
    case 'setAvatar': {
      return {
        ...stateData,
        avatar: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

const AddNewRecord = ({ navigation }) => {
  const listContext = useListContext();
  const initialState = {
    name: '',
    job: '',
    description: '',
    avatar: '',
    orderNo: null,
    id: new Date().valueOf().toString(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { characters } = listContext.state;

  const saveItem = async () => {
    state.orderNo = characters.length;
    const jsonValue = JSON.stringify(state);

    await AsyncStorage.setItem(state.id, jsonValue);
    listContext.setStorageData(state);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={styles.inputView}>
            <View style={styles.inputLabelView}>
              <Text style={styles.inputLabelText}>Name</Text>
            </View>

            <Input
              onChangeText={text =>
                dispatch({ type: 'setName', payload: text })
              }
              inputContainerStyle={styles.input}
              selectTextOnFocus={false}
              contextMenuHidden={true}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.inputLabelView}>
              <Text style={styles.inputLabelText}>Job Title</Text>
            </View>

            <Input
              onChangeText={text => dispatch({ type: 'setJob', payload: text })}
              inputContainerStyle={styles.input}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.inputLabelView}>
              <Text style={styles.inputLabelText}>Him/Her About</Text>
            </View>

            <Input
              onChangeText={text =>
                dispatch({ type: 'setDescription', payload: text })
              }
              inputContainerStyle={styles.inputDescription}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.inputLabelView}>
              <Text style={styles.inputLabelText}>Avatar</Text>
            </View>

            <Input
              onChangeText={text =>
                dispatch({ type: 'setAvatar', payload: text })
              }
              inputContainerStyle={styles.input}
            />
          </View>
        </View>
        <View style={styles.startButtonView}>
          <Button
            containerStyle={{
              width: '100%',
              padding: 20,
              backgroundColor: 'white',
            }}
            size={'md'}
            onPress={saveItem}
          >
            Save
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNewRecord;

const styles = StyleSheet.create({
  inputLabelView: {
    marginLeft: 10,
    margin: 5,
  },
  inputLabelText: {
    color: '#848785',
  },
  inputView: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: '95%',
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  inputDescription: {
    height: 80,
    width: '95%',
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  startButtonView: {
    display: 'flex',
    flexDirection: 'row',
  },
});
