import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Button, Card, Modal, Text, Input, useTheme } from '@ui-kitten/components';

// old import
const syllable = require('syllable');

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
            outputRange: [-200, -90]
    });

    const animStyle = {
        transform: [{
            translateY: yVal
        }]
    }

    const theme = useTheme();

    const [line1, setLine1] = React.useState<String>('');
    const [line1Color, setLine1Color] = React.useState<String>('danger');
    const [line2, setLine2] = React.useState<String>('');
    const [line2Color, setLine2Color] = React.useState<String>('danger');
    const [line3, setLine3] = React.useState<String>('');
    const [line3Color, setLine3Color] = React.useState<String>('danger');


    React.useEffect(() => {
        if (syllable(line1) === 5) {
            setLine1Color('success');
        } else {
            setLine1Color('danger');
        }
    }, [line1]);

    React.useEffect(() => {
        if (syllable(line2) === 7) {
            setLine2Color('success');
        } else {
            setLine2Color('danger');
        }
    }, [line2]);

    React.useEffect(() => {
        if (syllable(line3) === 5) {
            setLine3Color('success');
        } else {
            setLine3Color('danger');
        }
    }, [line3]);

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
                <Animated.View
                    style={[{ opacity: fadeAnimation }, animStyle]}
                    >
                    <Card disabled={true}>
                        <Text style={styles.header}>Enter your poem in the lines below:</Text>
                        <Input
                            onChangeText={nextVal => setLine1(nextVal)}
                            label='Line 1'
                            style={styles.textInput}
                            status={line1Color}
                        >
                        
                        </Input>
                        <Input
                            onChangeText={nextVal => setLine2(nextVal)}
                            label='Line 2'
                            style={styles.textInput}
                            status={line2Color}
                        >
                        
                        </Input>
                        <Input
                            onChangeText={nextVal => setLine3(nextVal)}
                            label='Line 3'
                            style={styles.textInput}
                            status={line3Color}
                        >
                        
                        </Input>
                        <Button onPress={() => setVisible(false)}>
                            SUBMIT
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
    header: {
        fontFamily: 'Acre-Medium',
        marginBottom: 12
    },
    textInput: {
        margin: 10
    }
});

export default AddPoemModal