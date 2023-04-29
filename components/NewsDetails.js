import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Share,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {searchBack} from '../store/redux/slice';
import {useBackHandler} from '@react-native-community/hooks';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const NewsDetails = ({route}) => {
  const dispatch = useDispatch();
  const [fontSize, setFontSize] = useState(16);

  const {
    categoryId,
    categoryDate,
    categoryItemTitle,
    categoryImage,
    categoryTitle,
    categoryContent,
    categoryUrl,
  } = route.params;

  useBackHandler(() => {
    dispatch(searchBack());
  });

  const formattedCategoryContent = categoryContent
    ? categoryContent.replace(
        /(<([^>]+)>|&ldquo;|&ndash;|&rdquo;|&nbsp;|&quot;)/gi,
        '',
      )
    : 'لا مزيد من التفاصيل حاليا...';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this page: ${categoryUrl}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: categoryImage
            ? categoryImage
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWqlGzve291vdBNzZaXD7oZ89UZ4IkVXLXMhEOxMhzWw&s',
        }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.share}>
          <Text style={styles.date}>{categoryDate.slice(0, 10)}</Text>
          <Pressable onPress={onShare}>
            <FontAwesome5 name="share-alt" size={24} color="#e0dede" />
          </Pressable>
        </View>
        <View style={styles.zoom}>
          <Pressable onPress={() => setFontSize(fontSize - 1)}>
            <FontAwesome5
              style={{marginHorizontal: 20}}
              name="minus-circle"
              size={28}
              color="#e0dede"
            />
          </Pressable>
          <Pressable onPress={() => setFontSize(fontSize + 1)}>
            <MaterialIcons name="add-circle" size={33} color="#e0dede" />
          </Pressable>
        </View>
        <Text style={styles.title}>{categoryItemTitle}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
        <Text style={[styles.categoryContent, {fontSize: fontSize}]}>
          {formattedCategoryContent}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: width,
    height: width / 1.5,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: 'grey',
    marginRight: 10,
  },
  title: {
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    backgroundColor: '#03296a',
  },
  separator: {
    borderBottomColor: '#03296a',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginTop: 4,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 14,
  },
  categoryContent: {
    color: 'grey',
    lineHeight: 24,
  },
  share: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
