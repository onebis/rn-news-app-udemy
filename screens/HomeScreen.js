import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../ components/ListItem';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loading from '../ components/Loading';
import { RefreshControl } from 'react-native';

const apikey = '7e11f8e7a5de4ab28b175a098b1b18be';
const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apikey}`;

export default function HomeScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const pageRef = useRef(1); //レンダリングが発生しない
    const fetchedAllRef = useRef(false);

    const fetchArticles = async (page) => {
        try {
            const response = await axios.get(`${URL}&page=${page}`);
            if (response.data.articles.length > 0) {
                setArticles((prevArticles) => [
                    ...prevArticles,
                    ...response.data.articles,
                ]);
            } else {
                fetchedAllRef.current = true;
            }
        } catch (error) {}
    };
    useEffect(() => {
        setLoading(true);
        fetchArticles(1);
        setLoading(false);
    }, []);

    const onEndReached = () => {
        if (!fetchedAllRef.current) {
            pageRef.current = pageRef.current + 1;
            fetchArticles(pageRef.current);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setArticles([]);
        pageRef.current = 1;
        fetchedAllRef.current = false;
        await fetchArticles(1);
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading && <Loading />}
            <FlatList
                data={articles}
                renderItem={({ item }) => (
                    <ListItem
                        imageUrl={item.urlToImage}
                        title={item.title}
                        author={item.author}
                        onPress={() => {
                            navigation.navigate('Article', {
                                article: item,
                            });
                        }}
                    />
                )}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
