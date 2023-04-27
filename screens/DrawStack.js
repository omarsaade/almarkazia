import 'react-native-gesture-handler';
import React, {useLayoutEffect, useState, useCallback, useRef} from 'react';
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
import {closeButton, switchIcon} from '../store/redux/slice';
import TabStack from './TabStack';
import NewsDetails from '../components/NewsDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import DrawerMenuSelection from '../components/DrawerMenuSelection';
const Drawer = createDrawerNavigator();

function DrawStack() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  // const textInputRef = useRef(null);
  const navigation = useNavigation();
  const {backButton} = useSelector(state => state.uiSlice);
  const [drawable, toggleDrawable] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const toggleState = () => {
    toggleDrawable(prevState => !prevState);
  };

  const backToto = () => {
    dispatch(switchIcon());
    navigation.navigate('Tabs');
  };

  const handlePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleSubmit = async () => {
    // setText(keyword);
    try {
      const response = await fetch(
        `https://www.almarkazia.com/ar/api/news/?keyword=${text}`,
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };

  const forwardId = useCallback(async id => {
    // console.log(id);
    try {
      dispatch(closeButton());
      navigation.navigate('SideMenuChooser', {
        categoryId: id,
      });
    } catch (error) {
      // handle the error
    }
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

  useLayoutEffect(() => {
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
              source={require('../assets/sync-logo.png')}
              style={{width: 120, height: 100, resizeMode: 'contain'}}
            />
          ),
        headerLeft: () => (
          <Pressable
            onPress={!backButton ? toggleState : backToto}
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
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
