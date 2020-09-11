import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView, Image, RefreshControl } from 'react-native';
import { Button, Divider, Spinner, useTheme, Icon, Input, Layout } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { logout } from '../../actions/LoginActions.js';
import { GET_ALL_POEMS } from '../../graphql/queries/getAllPoems.js';
import { GET_POEMS_BY_TITLE } from '../../graphql/queries/getPoemsByTitle.js';
import PoemCard from '../PoemCard';
import AddPoemModal from '../AddPoemModal';

export interface Props {
    logout: Function
}

export interface PropsIcon {

}

const SearchIcon: React.FC<PropsIcon> = (props) => (
  <Icon {...props} name='search-outline'/>
);

const MainFeed: React.FC<Props> = ({ logout }) => {

    // provides branding colors
    const theme = useTheme();

    const [refresh, setRefresh] = useState<Boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [poems, setPoems] = useState<Array<Object>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [addPoemVisible, setAddPoemVisible] = useState<Boolean>(false);

    // initial load of poems; useQuery is already a hook, so no need to
    // use it inside another hook
    const {loading, error, data, refetch} = useQuery(GET_ALL_POEMS);

    // query for searching poems by title
    const {loading: loadingS, error: errorS, data: dataS } = useQuery(GET_POEMS_BY_TITLE, { variables: { title: inputValue }})

    useEffect(() => {
      if (!loading && data) {
          setPoems(data.feed);
          setIsLoading(false);
      }
      if (loading && (data === null || data === {})) {
          setIsLoading(true);
      }
      // TODO: else set error here
    }, [data, loading])

    // searching effect
    useEffect(() => {
      if (!loadingS && dataS) {
        setPoems(dataS.findPoemByTitle);
        setIsLoading(false);
      }
      if (loadingS && (dataS === null || dataS === {})) {
        setIsLoading(true);
      }
      // TODO: else set error here
    }, [inputValue, dataS, loadingS])

    return (
      <SafeAreaView style={{ backgroundColor: theme['color-primary-transparent-200'], flex: 1 }}>
        
        <Button style={styles.signoutButton} onPress={() => logout()}>Sign Out</Button>
        <Input
          style={styles.searchInput}
          value={inputValue}
          placeholder='Search by title...'
          accessoryLeft={SearchIcon}
          onChangeText={nextValue => setInputValue(nextValue)}
        />
        <Divider style={styles.divider} />
          { isLoading ? (
                <Spinner style={styles.spinner}/>
            )
            : (
            <FlatList
              style={{ marginBottom: 30 }}
              refreshControl={ <RefreshControl
                refreshing={refresh} onRefresh={async () => {
                  setRefresh(true);
                  await refetch();
                  setRefresh(false);
                }}
              />}
              contentContainerStyle={styles.container}
              data={poems}
              renderItem={({item}) => {
                return (
                  <PoemCard
                    cardStyle={[styles.card, { borderColor: theme['color-primary-transparent-500'], flex: 1 }]}
                    layoutStyle={{ backgroundColor: theme['color-primary-transparent-000'] }}
                    title={item.title}
                    content={item.content}
                    author={item.author.name}
                    createdAt={item.createdAt}
                    isHaiku={item.isHaiku}
                  />
                );
              }}
              keyExtractor={item => item.id}
            />
            )}
            
          <Button
            onPress={() => setAddPoemVisible(true)}
            style={styles.addPostButton}
          >+</Button>

          { addPoemVisible ?
            ( 
            <AddPoemModal
              visible={addPoemVisible}
              setVisible={setAddPoemVisible}
            ></AddPoemModal>
            )
            :
            null
          }
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: '5%'
  },
  card: {
    padding: '5%',
    borderRadius: 30,
    width: '70%'
  },
  searchInput: {
    width: '80%',
    left: '10%',
    right: '10%'
  },
  addPostButton: {
    bottom: 30,
    flexDirection: 'column-reverse',
    alignSelf: 'flex-end',
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    right: 25
  },
  divider: {
    backgroundColor: 'transparent',
    height: '3%'
  },
  spinner: {
    alignSelf: 'center',
    marginVertical: '50%'
  },
  signoutButton: {
    alignSelf: 'flex-end',
    margin: 20
  }
});

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(MainFeed);