import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../ components/ListItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apikey = '7e11f8e7a5de4ab28b175a098b1b18be';
const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${apikey}`;

export default function HomeScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const fetchArticles = async () => {
        try {
            const response = await axios.get(URL);
            setArticles(response.data.articles);
        } catch (error) {}
    };
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
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
