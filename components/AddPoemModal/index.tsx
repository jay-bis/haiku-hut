import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Button, Card, Modal, Text, Input, Icon, Layout, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { post, clearPostStatus } from '../../actions/PostingActions.js';

// old import
const syllable = require('syllable');

export interface State {
    post: PostObject
}

export interface PostObject {
    postLoading: Boolean,
    successfulPost: Boolean
}

export interface Props {
    visible: Boolean,
    setVisible: Function,
    post: Function,
    postLoading: Boolean,
    successfulPost: Boolean,
    clearPostStatus: Function
}

export interface PropsIcon {
    props?: Object
}

export interface PropsLoading {
    postLoading: Boolean,
    successfulPost: Boolean
}

const HaikuIcon: React.FC<PropsIcon> = props => (
    <Icon 
        {...props}
        name='checkmark-circle-2-outline'
        fill='#133A03'
    />
);

const NonHaikuIcon: React.FC<PropsIcon> = props => (
    <Icon
        {...props}
        name='heart-outline'
        fill='#4A052D'
    />
)

const ProgressIndicator: React.FC<PropsLoading> = ({ postLoading, successfulPost }) => {
    if (postLoading) {
        return (
            <View style={styles.spinner}>
                <Spinner size='small' status='basic'/>
            </View>
        )
    }
    if (successfulPost) {
        return (
            <View style={styles.successIcon}>
                <Icon fill='#ffffff' name='checkmark-circle-2-outline' />
            </View>
        )
    }
    return null;
}

const formatPoemAndPost = (
    line1: String, line2: String, line3: String,
    status1: String, status2: String, status3: String,
    title: String, postFn: Function, setError: Function) => {

    setError(false);
    if (line1 === '' || line2 === '' || line3 === '' || title === '') {
        setError(true);
        return;
    }
    const poem = line1 + '\n' + line2 + '\n' + line3;
    let isHaiku;
    if (status1 === 'success' && status2 === 'success' && status3 === 'success') {
        isHaiku = true;
    } else {
        isHaiku = false;
    }
    postFn(title, poem, isHaiku);
};

const AddPoemModal: React.FC<Props> = ({ visible, setVisible, post, postLoading, successfulPost, clearPostStatus }) => {

    const fadeAnimation = React.useRef(new Animated.Value(0)).current
    const moveAnimation = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (visible) {
            Animated.timing(
                fadeAnimation,
                {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true
                },
            ).start();
            Animated.timing(
                moveAnimation,
                {
                    toValue: 1,
                    duration: 700,
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

    const [title, setTitle] = React.useState<String>('');
    const [line1, setLine1] = React.useState<String>('');
    const [line1Color, setLine1Color] = React.useState<String>('danger');
    const [line2, setLine2] = React.useState<String>('');
    const [line2Color, setLine2Color] = React.useState<String>('danger');
    const [line3, setLine3] = React.useState<String>('');
    const [line3Color, setLine3Color] = React.useState<String>('danger');
    const [validationError, setValidationError] = React.useState<Boolean>(false);
    const [isHaiku, setIsHaiku] = React.useState<any>(null);

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

    React.useEffect(() => {
        if (line1Color === 'success' && line2Color === 'success' && line3Color === 'success') {
            setIsHaiku(true);
        } else {
            setIsHaiku(false);
        }
    }, [line1Color, line2Color, line3Color]);

    React.useEffect(() => {
        if (successfulPost) {
            setTimeout(() => {
                clearPostStatus();
                setVisible(false);
            }, 1500);
        }
    }, [successfulPost]);

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
                            onChangeText={nextVal => setTitle(nextVal)}
                            label='Title'
                            style={styles.textInput}
                        ></Input>
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
                        {
                            isHaiku 
                            ?
                                <React.Fragment>
                                    <Layout style={styles.iconContainer}>
                                        <HaikuIcon  />
                                    </Layout>
                                    <Text style={styles.haikuIconText}>Haiku</Text>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <Layout style={styles.iconContainer}>
                                        <NonHaikuIcon />
                                    </Layout>
                                    <Text style={styles.iconText}>Free Form</Text>
                                </React.Fragment>
                        }
                        {
                            validationError
                            ?
                                <Text style={styles.errorText}>Error: All lines must be filled!</Text>
                            :
                                null
                        }
                        <Button onPress={() => {
                            formatPoemAndPost(line1, line2, line3, line1Color, line2Color, line3Color, title, post, setValidationError)
                        }}
                            status='primary'
                            accessoryLeft={() => <ProgressIndicator postLoading={postLoading} successfulPost={successfulPost} />}    
                        >
                            {postLoading ? 'LOADING' : (successfulPost ? 'SUCCESS!' : 'SUBMIT')}
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
    },
    iconText: {
        fontFamily: 'Acre-Medium',
        fontSize: 14,
        marginBottom: 20,
        left: 19
    },
    haikuIconText: {
        fontFamily: 'Acre-Medium',
        fontSize: 14,
        marginBottom: 20,
        left: 32
    },
    iconContainer: {
        height: 40,
        width: 100,
        marginBottom: 4
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontFamily: 'Acre-Medium',
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    },
    successIcon: {
        height: 28,
        width: 28,
    }
});

const mapStateToProps = (state: State) => ({
    postLoading: state.post.postLoading,
    successfulPost: state.post.successfulPost
})

const mapDispatchToProps = {
    post,
    clearPostStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPoemModal)