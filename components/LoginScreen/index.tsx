import React from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Text, Input, Button, Icon, Layout, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { login } from '../../actions/LoginActions.js';

export interface Props {
    token: String,
    login: Function,
    loginLoading: Boolean
}

export interface PropsIcon {
    props: Object
}

export interface State {
    login: LoginObject,
}

export interface LoginObject {
    token: String,
    id: String,
    loginLoading: Boolean
}

const EmailIcon: React.FC<PropsIcon> = props => (
    <Icon
        {...props}
        name='email-outline'
    />
);

const PasswordIcon: React.FC<PropsIcon> = props => (
    <Icon
        {...props}
        name='eye-off-outline'
    />
);

const LoadingIndicator: React.FC<PropsIcon> = props => (
    <View style={styles.spinner}>
        <Spinner size='small' status='basic'/>
    </View>
)

const loginAndSetToken = async (email: String, password: String, login: Function) => {
    const result = await login(email, password);
    const stringToken = JSON.stringify(result);
    AsyncStorage.setItem('token', stringToken);
}

const LoginScreen: React.FC<Props> = ({ login, loginLoading }) => {

    const [email, setEmail] = React.useState<String>('');
    const [password, setPassword] = React.useState<String>('');

    return (
        <Layout style={styles.container}>
            <Input
                label='Email'
                style={styles.inputStyle}
                accessoryRight={EmailIcon}
                onChangeText={nextVal => setEmail(nextVal)}
            ></Input>
            <Input
                label='Password'
                style={styles.inputStyle}
                placeholder='********'
                accessoryRight={PasswordIcon}
                onChangeText={nextVal => setPassword(nextVal)}
            ></Input>
            <Button 
                style={styles.buttonSyle}
                //onPress={() => login(email, password)}
                onPress={() => loginAndSetToken(email, password, login)}
                accessoryLeft={loginLoading ? LoadingIndicator : null}
                size='large'
            >{loginLoading ? 'Loading' : 'Submit'}</Button>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.jpg')}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 14,
    },
    inputText: {
        fontSize: 12
    },
    container: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    buttonSyle: {
        margin: 24
    },
    inputStyle: {
        width: 280,
        height: 32,
        margin: 24
    },
    logo: {
        height: 180,
        width: 180
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state: State) => ({
    loginLoading: state.login.loginLoading
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)