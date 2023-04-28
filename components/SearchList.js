import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {switchIcon} from '../store/redux/slice';
const SearchList = () => {
  const {dataIsLoading} = useSelector(state => state.uiSlice);
  const {dataQuery} = useSelector(state => state.uiSlice);
  const dispatch = useDispatch();

  const navigation = useNavigation();

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
    <>
      {dataIsLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>الرجاء الانتظار قليلاً...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={dataQuery}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Pressable onPress={() => pressHandler(item)}>
                <View style={styles.articleContainer}>
                  <Image
                    source={{
                      uri: item.image
                        ? item.image
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqlGzve291vdBNzZaXD7oZ89UZ4IkVXLXMhEOxMhzWw&s',
                    }}
                    style={styles.articleImage}
                  />
                  <View style={styles.articleContent}>
                    <Text style={styles.articleTitle}>{item.longTitle}</Text>
                    <View style={styles.footer}>
                      <Text style={styles.articleDate}>
                        {item.date.slice(0, 10)}
                      </Text>
                      <Text style={styles.articleText}>
                        {item.category.title}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    </>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  articleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 2,
  },
  articleImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  articleContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#03296a',
  },
  articleDate: {
    fontSize: 12,
    color: '#999',
  },
  articleText: {
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#03296a',
    color: '#FFFFFF',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
