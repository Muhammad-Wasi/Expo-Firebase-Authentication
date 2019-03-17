import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupAction } from '../Store/Action/Action';

import {
    Image,
    Platform,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';

import { MonoText } from '../components/StyledText';

class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cond: false,
            name: '',
            email: '',
            password: '',
            ConfPassword: ''
        }

        this.signup = this.signup.bind(this);

    }
    static navigationOptions = {
        title: 'Signup',
        headerStyle: {
            backgroundColor: '#57b847',
            // alignSelf: 'center'

        },
        headerLeft: (
            <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('Login') }}
                style={{ paddingVertical: 3, paddingHorizontal: 10, backgroundColor: 'white', marginLeft: 8, borderRadius: 8 }}
            >
                <Text
                    style={{ fontSize: 18, color: 'black' }}
                >
                    Back
                </Text>
            </TouchableOpacity>
        ),

    };

    signup() {
        const { cond, name, email, password, ConfPassword } = this.state;
        if (name && email && password && password === ConfPassword) {
            this.setState({ cond: true })
            this.props.actions.signupAction({ name, email, password })
                .then(success => {
                    this.setState({ cond: false })
                    this.props.navigation.navigate('Signup')
                    console.log('success*****', success)
                })
                .catch(error => {
                    this.setState({ cond: false })
                    console.log('error********', error)
                })
        }
        else {
            if (!name) {

            }
            else if (name && !email) {

            }
            else if (name && email && !password) {

            }
            else if (name && email && password && !ConfPassword) {

            }
            else if (name && email && password && password === ConfPassword) {

            }
        }
    }


    render() {
        const { cond, name, email, password, ConfPassword } = this.state;
        return (
            <LinearGradient
                colors={['#ffffff', '#ffffff', '#ffffff']}
                style={{ height: '100%', justifyContent: 'center' }}
            >
                <View style={{ position: 'relative' }}>
                    <View>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.Inputs}
                            placeholder="Username"
                            value={name}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.Inputs}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.Inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.Inputs}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={ConfPassword}
                            onChangeText={(text) => this.setState({ ConfPassword: text })}
                        />
                        {
                            cond ?
                                <TouchableOpacity disabled style={styles.button}>
                                    <Text style={styles.login}>Signup</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={this.signup} style={styles.button}>
                                    <Text style={styles.login}>Signup</Text>
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.loader}>
                        {
                            cond &&
                            <ActivityIndicator size="large" color="#57b847" />

                        }
                    </View>
                </View>

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    LinearGradient: {
        justifyContent: 'center'
    },
    label: {
        fontSize: 20,
        margin: 5,
        paddingLeft: 15,
        marginHorizontal: 40,
    },
    Inputs: {
        height: 45,
        fontSize: 18,
        paddingLeft: 18,
        margin: 5,
        marginHorizontal: 40,
        borderRadius: 100,
        backgroundColor: '#ebebeb',
        color: 'black',
    },

    button: {
        height: 45,
        marginTop: 25,
        marginHorizontal: 40,
        borderRadius: 100,
        backgroundColor: '#57b847',
        justifyContent: 'center',
    },

    login: {
        fontSize: 22,
        color: 'white',
        alignSelf: 'center'
    },
    loader: {
        position: 'absolute',
        left: '45%',
        top: '45%'
    }
});


function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({
            signupAction
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(SignupScreen);