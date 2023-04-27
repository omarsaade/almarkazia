import React, {useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {switchIcon} from '../store/redux/slice';

const NewsTopics = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderCategoryItem = useCallback(({item: itemData}) => {
    const pressHandler = () => {
      dispatch(switchIcon());
      navigation.navigate('Detail', {
        categoryId: itemData.id,
        categoryDate: itemData.date,
        categoryItemTitle: itemData.category.title,
        categoryImage: itemData.image,
        categoryTitle: itemData.title,
        categoryContent: itemData.content,
        categoryUrl: itemData.url,
      });
    };

    return (
      <Pressable style={styles.item} onPress={pressHandler}>
        <View>
          <Image
            source={{
              uri: itemData.image
                ? itemData.image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqlGzve291vdBNzZaXD7oZ89UZ4IkVXLXMhEOxMhzWw&s',
            }}
            style={styles.articleImage}
          />
          <View style={styles.secondContainer}>
            <Text style={styles.dateOfNews}>
              <MaterialCommunityIcons
                name="clock-time-nine"
                size={7}
                color="#03296a"
              />
              {itemData.date.split(' ')[0]}
            </Text>
            <Text style={styles.iqtisad}>{itemData.category.title}</Text>
          </View>
          <Text style={styles.firstTitle}>
            {itemData.longTitle
              .split(' ')
              .filter((word, index) => index < 13)
              .join(' ')}
          </Text>
        </View>
      </Pressable>
    );
  });

  return (
    <>
      <FlatList
        scrollEnabled={false}
        data={data.slice(0, 2)}
        keyExtractor={() => Math.random() * 1000}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        ListHeaderComponent={
          <View style={styles.mini}>
            <Text style={styles.miniText}>{data[0].category.title}</Text>
          </View>
        }
        renderItem={renderCategoryItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    height: 190,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 2,
  },
  articleImage: {
    height: '60%',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  dateOfNews: {
    fontSize: 7,
  },
  categoryTitle: {
    color: '#03296a',
    fontWeight: 'bold',
    fontSize: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  categoryContent: {
    fontSize: 7,
    marginHorizontal: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  iqtisad: {
    backgroundColor: '#03296a',
    color: 'white',
    padding: 4,
    fontSize: 7,
    fontWeight: 'bold',
  },
  firstTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#03296a',
    marginHorizontal: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mini: {
    backgroundColor: '#0d3986',
    display: 'flex',
    justifyContent: 'center',
  },
  miniText: {
    color: 'white',
    marginRight: 10,
    padding: 5,
  },
});

export default NewsTopics;
