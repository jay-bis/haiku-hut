import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export interface Props {
    visible: Boolean,
    setVisible: Function
}

const AddPoemModal: React.FC<Props> = ({ visible, setVisible }) => {

    const fadeAnimation = React.useRef(new Animated.Value(0)).current
    const moveAnimation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (visible) {
            Animated.timing(
                fadeAnimation,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                },
            ).start();
            Animated.timing(
                moveAnimation,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start();
        }
      }, [fadeAnimation, moveAnimation, visible])

        const yVal = moveAnimation.interpolate({
            inputRange: [0, 1],
                outputRange: [-100, 0]
        });

        const animStyle = {
            transform: [{
                translateY: yVal
            }]
        }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
                <Animated.View
                    style={[{ opacity: fadeAnimation }, animStyle]}
                    >
                    <Card disabled={true}>
                        <Text>Welcome to UI Kitten 😻</Text>
                        <Button onPress={() => setVisible(false)}>
                            DISMISS
                        </Button>
                    </Card>
                </Animated.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default AddPoemModal