import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import SwipeView from './SwipeView';
import NewsTopics from './NewsTopics';

const HomePage = () => {
  const [fourCornerData, setFourCornerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://www.almarkazia.com/ar/api/news/?category=24'),
          fetch('https://www.almarkazia.com/ar/api/news/?category=4'),
          fetch('https://www.almarkazia.com/ar/api/news/?category=7'),
          fetch('https://www.almarkazia.com/ar/api/news/?category=9'),
        ]);
        const jsonData = await Promise.all(responses.map(res => res.json()));
        const newData = jsonData.map(data => {
          return data.data.slice(0, 2);
        });
        setFourCornerData(newData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <SwipeView style={styles.swiper} />
        {fourCornerData.flatMap(item => {
          return <NewsTopics data={item} key={Math.random() * 1000} />;
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  swiper: {
    flex: 0,
  },
});

export default HomePage;
