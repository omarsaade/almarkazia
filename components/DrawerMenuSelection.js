import React, {useCallback, useLayoutEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeButton} from '../store/redux/slice';
import {AddSectionData} from '../store/redux/slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderImage from './HeaderImage';
import {useRoute} from '@react-navigation/native';

const DrawerMenuSelection = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const route = useRoute();
  const catId = route.params.categoryId;
  const {sectionData} = useSelector(state => state.uiSlice);

  useLayoutEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getNews(catId).then(arrayOfNews => {
      if (mounted) {
        dispatch(AddSectionData(arrayOfNews.data));
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [dispatch, catId]);

  const getNews = useCallback(
    async catId => {
      const response = await fetch(
        `https://www.almarkazia.com/ar/api/news/?category=${catId}`,
      );
      const data = await response.json();
      return data;
    },
    [catId],
  );

  const renderCategoryItem = ({item: itemData}) => {
    const pressHandler = () => {
      dispatch(closeButton());
      navigation.navigate('Detail', {
        categoryId: catId,
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
          <Image source={{uri: itemData.image}} style={styles.articleImage} />
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
              .filter((word, index) => index < 8)
              .join(' ')}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>الرجاء الانتظار قليلاً...</Text>
        </View>
      ) : (
        <FlatList
          data={sectionData.slice(1)}
          keyExtractor={() => Math.random() * 1000}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'center', alignItems: 'center'}}
          ListHeaderComponent={<HeaderImage news={sectionData[8]} />}
          renderItem={renderCategoryItem}
        />
      )}
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
    margin: 5,
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
});

export default DrawerMenuSelection;
