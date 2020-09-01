import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POEMS } from '../../graphql/queries/getAllPoems.js';


export interface Props {
    navigation: Object
}

const MainFeed: React.FC<Props> = ({navigation}) => {

    const [poems, setPoems] = useState<Array<Object>>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // initial load of poems; useQuery is already a hook, so no need to
    // use it inside another hook
    const {loading, error, data} = useQuery(GET_ALL_POEMS);

    useEffect(() => {
        if (!loading && data) {
            console.log(data.feed);
            setPoems(data.feed);
            setIsLoading(false);
        }
        if (loading && (data == null || data == {})) {
            setIsLoading(true);
        }
        // TODO: else set error here
    }, [data, loading])

    return (
      <SafeAreaView>
          <TopNavigation title='HaikuHut' alignment='center'/>
          <Divider/>
          { isLoading ? (
                <Text>Loading...</Text>
            )
            : (
            <FlatList
              data={poems}
              renderItem={({item}) => {
                return (
                  <View>
                    <Text>{item.title}</Text>
                    <Text>{item.content}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
            )}

        </SafeAreaView>
      );
}

export default MainFeed;