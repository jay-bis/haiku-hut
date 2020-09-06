import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, useTheme, Icon, Input, Modal, Text } from '@ui-kitten/components';

export interface Props {
    visible: Boolean,
    setVisible: Function
}

const AddPoemModal: React.FC<Props> = ({ visible, setVisible }) => {
    return (
        <View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                <Text>Welcome to UI Kitten 😻</Text>
                <Button onPress={() => setVisible(false)}>
                    DISMISS
                </Button>
                </Card>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default AddPoemModal