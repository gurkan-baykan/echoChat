import React from 'react';
import { Text } from '@rneui/base';
import { ScrollView, StyleSheet, View, Image } from 'react-native';

const ListDetails = ({ route }) => {
  const { item } = route.params.item;
  const { avatar, description, job, name } = item;

  return (
    <ScrollView>
      <View>
        <View style={styles.imageView}>
          <Image
            width={300}
            height={200}
            style={{ width: 300, height: 200 }}
            resizeMode="contain"
            source={{
              uri: avatar,
            }}
          />
        </View>

        <View style={styles.nameView}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View style={styles.nameView}>
          <Text style={styles.jobText}>{job}</Text>
        </View>

        <View style={styles.descriptionView}>
          <Text style={styles.jobText}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ListDetails;

const styles = StyleSheet.create({
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  nameView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobText: {
    fontSize: 18,
  },
  descriptionView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 12,
    marginVertical: 8,
  },
});
