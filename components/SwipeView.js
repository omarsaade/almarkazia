import React from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import {switchIcon} from '../store/redux/slice';

const SwipeView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {latestNews} = useSelector(state => state.uiSlice);

  const pressHandler = item => {
    dispatch(switchIcon());
    navigation.navigate('Detail', {
      categoryId: item.id,
      categoryDate: item.date,
      categoryItemTitle: item.category.title,
      categoryImage: item.image,
      categoryTitle: item.title,
      categoryContent: item.content,
      categoryUrl: item.url,
    });
  };

  return (
    <View style={styles.container}>
      <Swiper loop autoplay showsPagination={false}>
        {latestNews.slice(0, 4).map(news => (
          <Pressable key={news.id} onPress={() => pressHandler(news)}>
            <ImageBackground
              source={{
                uri: news.image
                  ? news.image
                  : 'https://cdn.head-fi.org/assets/classifieds/hf-classifieds_no-image-available_2.jpg',
              }}
              style={styles.image}>
              <View style={styles.topLeftContainer}>
                <MaterialCommunityIcons
                  name="clock-time-nine"
                  size={18}
                  color="white"
                />
                <Text style={styles.topLeftText}>
                  {news.date.split(' ')[1]}
                </Text>
              </View>
              <View style={styles.topRightContainer}>
                <Text style={styles.topRightText}>{news.category.title}</Text>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>
                  {news.title
                    .split(' ')
                    .filter((word, index) => index < 17)
                    .join(' ')}
                  ...
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginBottom: 2,
  },
  image: {
    height: 220,
    width: '100%',
    resizeMode: 'center',
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
    fontSize: 15,
    fontWeight: '800',
    color: 'white',
    textAlign: 'right',
  },
});
export default SwipeView;
