import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import _ from 'lodash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import StoryListItem from './StoryListItem';

const URL = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=';

const HomeScreen = ({navigation}) => {
  const [stories, setStories] = useState({});
  const [pageNumber, setPageNaumber] = useState(0);

  useEffect(() => {
    const currentURL = URL + pageNumber;
    // let intervel;
    if (_.isEmpty(stories)) {
      fetch(currentURL)
        .then(data => data.json())
        .then(data => {
          setStories(data.hits);
          // intervel = setInterval(fetchData(), 10000);
        })
        .catch(err => console.error(err));
    }
    return function clear() {
      // clearInterval(intervel);
    };
  });

  const rendererStoryItem = item => {
    return (
      <StoryListItem
        item={item}
        onPressHandler={story => onPressHandler(story)}
      />
    );
  };

  const onPressHandler = story => {
    navigation.navigate('Details', story);
  };

  const fetchData = () => {
    console.log('fetchData');
    setPageNaumber(pageNumber + 1);
    const currentURL = URL + pageNumber;
    fetch(currentURL)
      .then(data => data.json())
      .then(data => {
        if (!_.isEmpty(stories)) {
          const updatedStoreis = stories.concat(data.hits);
          setStories(updatedStoreis);
        }
      });
  };

  const onEndReached = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      {_.isEmpty(stories) ? (
        <Text>Loading data</Text>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => rendererStoryItem(item)}
          onEndReached={() => onEndReached()}
          onEndReachedThreshold={3}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
