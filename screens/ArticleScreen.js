import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import ClipButton from '../ components/ClipButton';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default function ArticleScreen({ route }) {
    const { article } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { clips } = user;

    const isCliped = () => {
        return clips.some((clip) => clip.url === article.url);
    };

    const toggleCliped = () => {
        if (isCliped()) {
            dispatch(deleteClip({ clip: article }));
        } else {
            dispatch(addClip({ clip: article }));
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <ClipButton onPress={toggleCliped} cliped={isCliped()}></ClipButton>
            <WebView source={{ uri: article.url }} />
        </SafeAreaView>
    );
}
