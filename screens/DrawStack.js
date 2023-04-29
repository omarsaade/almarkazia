import 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  closeButton,
  switchIcon,
  setDataToFalse,
  setDataToTrue,
  setDataQuery,
} from '../store/redux/slice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import DrawerMenuSelection from '../components/DrawerMenuSelection';
import SearchList from '../components/SearchList';
import TabStack from './TabStack';
import NewsDetails from '../components/NewsDetails';

const Drawer = createDrawerNavigator();

function DrawStack() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const {backButton} = useSelector(state => state.uiSlice);
  const [drawable, toggleDrawable] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const toggleState = () => {
    toggleDrawable(prevState => !prevState);
  };

  const backToTabs = () => {
    dispatch(switchIcon());
    navigation.navigate('Tabs');
  };

  const handlePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleSubmit = async () => {
    dispatch(setDataToFalse());
    navigation.navigate('SearchList');
    try {
      const response = await fetch(
        `https://www.almarkazia.com/ar/api/news/?keyword=${text}`,
      );
      const data = await response.json();
      dispatch(setDataToTrue());
      dispatch(setDataQuery(data.data[0]));
      setText('');
    } catch (error) {}
  };

  const forwardId = useCallback(async id => {
    try {
      dispatch(closeButton());
      navigation.navigate('SideMenuChooser', {
        categoryId: id,
      });
    } catch (error) {}
  }, []);

  const getMenuItems = async () => {
    const response = await fetch(
      'https://www.almarkazia.com/ar/api/news/categories/',
    );
    const data = await response.json();
    const items = data.data.map(item => (
      <View key={item.id}>
        <DrawerItem
          onPress={() => forwardId(item.id)}
          name={item.name}
          label={() => (
            <Text style={{color: 'white', fontSize: 15}}>{item.title}</Text>
          )}
        />
      </View>
    ));
    setMenuItems(items);
  };

  useEffect(() => {
    try {
      getMenuItems();
    } catch (error) {
      console.log('Fetch error: ', error.message);
    }
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={() => (
        <ScrollView style={styles.header}>{menuItems}</ScrollView>
      )}
      drawerContentOptions={{
        overlayColor: 'rgba(0, 0, 0, 0.1)',
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#03296a',
          marginTop: '14%',
          width: '65%',
        },
        drawerPosition: 'right',
        //  headerLeft:null; bte5fe
        headerStyle: {backgroundColor: '#03296a'},
        headerTitleAlign: 'center',
        headerTitle: () =>
          drawable ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="اكتب شيئا..."
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
              />
            </View>
          ) : (
            <Image
              source={require('../assets/al.png')}
              style={{width: 140, height: 100, resizeMode: 'contain'}}
            />
          ),
        headerLeft: () => (
          <Pressable
            onPress={!backButton ? toggleState : backToTabs}
            style={{marginLeft: 10}}>
            {backButton && (
              <Ionicons name="chevron-back" size={30} color="white" />
            )}
            {!backButton && (
              <EvilIcons
                name={drawable ? 'close' : 'search'}
                size={30}
                color="white"
              />
            )}
          </Pressable>
        ),

        headerRight: () =>
          drawable ? null : (
            <Pressable onPress={handlePress} style={{marginRight: 20}}>
              <Feather name="menu" size={24} color="white" />
            </Pressable>
          ),
      }}>
      <Drawer.Screen name="Tabs" component={TabStack} />
      <Drawer.Screen name="Detail" component={NewsDetails} />
      <Drawer.Screen name="SideMenuChooser" component={DrawerMenuSelection} />
      <Drawer.Screen name="SearchList" component={SearchList} />
    </Drawer.Navigator>
  );
}

export default DrawStack;

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    width: 280,
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    height: 20,
    marginHorizontal: -15,

    zIndex: 3000,
    elevation: 10,
    position: 'relative',
  },
  searchInput: {
    borderColor: 'gray',
    padding: '-2%',
    marginRight: '4%',
    zIndex: 3000,
    flex: 1,
    color: 'black',
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
