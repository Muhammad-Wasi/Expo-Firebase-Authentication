import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { signinAction } from '../Store/Action/Action';
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


} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';

import { MonoText } from '../components/StyledText';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cond: false,
            email: '',
            password: ''
        }

        this.login = this.login.bind(this);
    }

    static navigationOptions = {
        // header: null,
        title: "Login",
    };

    login() {
        const { email, password, cond } = this.state;
        if (email && password) {
            this.setState({ cond: true })
            this.props.actions.signinAction({ email, password })
                .then(success => {
                    this.setState({ cond: false })
                    this.props.navigation.navigate('Home')
                    console.log('success*****', success)
                })
                .catch(error => {
                    this.setState({ cond: false })
                    console.log('error********', error)
                })
        }
        else {
            if (email) {

            }
            else if (email && !password) {

            }
        }
    }

    render() {
        const { email, password, cond } = this.state;
        return (
            <LinearGradient
                colors={['#ffffff', '#ffffff', '#ffffff']}
                style={{ height: '100%', justifyContent: 'center' }}
            >
                <View style={{ position: 'relative' }}>
                    <View>
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

                        {
                            cond ?
                                <View>
                                    <TouchableOpacity disabled onPress={this.login} style={styles.button}>
                                        <Text style={styles.login}>Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled onPress={() => { this.props.navigation.navigate('Signup') }} style={styles.button}>
                                        <Text style={styles.login}>Create account</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity onPress={this.login} style={styles.button}>
                                        <Text style={styles.login}>Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Signup') }} style={styles.button}>
                                        <Text style={styles.login}>Create account</Text>
                                    </TouchableOpacity>
                                </View>
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
            signinAction
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(LoginScreen);