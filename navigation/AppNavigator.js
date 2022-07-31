import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ClipScreen from '../screens/ClipScreen';
import ArticleScreen from '../screens/ArticleScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    );
};
const ClipStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Clip"
                component={ClipScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    );
};

const screenOption = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
            case 'Home':
                iconName = 'home';
                break;
            case 'Clip':
                iconName = 'bookmark';
                break;
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
    },
});

export default function AppNavigator() {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOption}>
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Clip" component={ClipStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
