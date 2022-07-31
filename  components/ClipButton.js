import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
});

const ClipButton = ({ onPress, cliped }) => {
    const IconName = cliped ? 'bookmark' : 'bookmark-o';
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <FontAwesome name={IconName} size={40} color="gray" />
        </TouchableOpacity>
    );
};

export default ClipButton;
