import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";

import { AuthContext } from "../providers/AuthProvider";

const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Card>
                        <Card.Title style={styles.main} >Welcome to BlogApp</Card.Title>
                        <Card.Divider />

                        <Input
                            leftIcon={<FontAwesome name="envelope-open-o" size={24} color="grey" />}
                            placeholder="   E-mail"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}
                        />

                        <Input
                            placeholder="   Password"
                            leftIcon={<Feather name="unlock" size={24} color="grey" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <Button
                            type="solid"
                            icon={<FontAwesome name="hand-o-right" size={24} color="white" />}
                            title="  Sign In!"
                            buttonStyle={styles.button}
                            onPress={function () {
                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(Email, Password)
                                    .then((userCreds) => {
                                        auth.setIsLoggedIn(true);
                                        auth.setCurrentUser(userCreds.user);
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });
                            }}
                        />

                        <Button
                            type="clear"
                            icon={<AntDesign name="user" size={24} color="seagreen" />}
                            title="  Don't have an account?"
                            onPress={function () {
                                props.navigation.navigate("SignUp");
                            }}
                        />
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#73C6B6",
    },
    button: {
        backgroundColor: "#16A085",
        borderColor: "#16A085",
        borderRadius: 20,
    },
    main: {
        fontSize: 20,
    }

});

export default SignInScreen;