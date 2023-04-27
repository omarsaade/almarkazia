import React from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {closeButton} from '../store/redux/slice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HeaderImage = ({news}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (!news) {
    return null;
  }

  const pressHandler = () => {
    dispatch(closeButton());
    navigation.navigate('Detail', {
      categoryId: news.id,
      categoryDate: news.date,
      categoryItemTitle: news.category.title,
      categoryImage: news.image,
      categoryTitle: news.title,
      categoryContent: news.content,
      categoryUrl: news.url,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pressHandler}>
        <ImageBackground
          source={{
            uri: news.image,
          }}
          style={styles.image}>
          <View style={styles.topLeftContainer}>
            <MaterialCommunityIcons
              name="clock-time-nine"
              size={18}
              color="white"
            />
            <Text style={styles.topLeftText}>{news.date.split(' ')[1]}</Text>
          </View>
          <View style={styles.topRightContainer}>
            <Text style={styles.topRightText}>{news.category.title}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>{news.title}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 4,
  },
  image: {
    height: 220,
    width: '100%',
    resizeMode: 'cover',
  },
  topLeftContainer: {
    position: 'absolute',
    top: 2,
    left: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLeftText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  topRightContainer: {
    position: 'absolute',
    top: 5,
    right: 7,
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  topRightText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    textAlign: 'right',
  },
});

export default HeaderImage;
