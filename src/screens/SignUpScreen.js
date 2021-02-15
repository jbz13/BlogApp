import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as firebase from "firebase";

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <View style={styles.viewStyle}>
            <Card>
                <Card.Title style={styles.main}>BlogApp</Card.Title>
                <Card.Divider />

                <Input
                    leftIcon={<FontAwesome name="id-badge" size={24} color="grey" />}
                    placeholder="   Name"
                    onChangeText={function (currentInput) {
                        setName(currentInput);
                    }}
                />

      
                <Input
                    leftIcon={<FontAwesome name="id-badge" size={24} color="grey" />}
                    placeholder="   Student Id"
                    onChangeText={function (currentInput) {
                        setSID(currentInput);
                    }}
                />

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
                    onChangeText={function (currentInput) {
                        setPassword(currentInput);
                    }}
                />


                <Button
                    type="solid"
                    icon={<FontAwesome name="hand-o-right" size={24} color="white" />}
                    title="  Sign Up"
                    buttonStyle={styles.button}
                    onPress={function () {
                        if (Name && SID && Email && Password) {
                            firebase
                                .auth()
                                .createUserWithEmailAndPassword(Email, Password)
                                .then((userCreds) => {
                                    userCreds.user.updateProfile({ displayName: Name });
                                    firebase
                                        .firestore()
                                        .collection("users")
                                        .doc(userCreds.user.uid)
                                        .set({
                                            name: Name,
                                            sid: SID,
                                            email: Email,
                                        })
                                        .then(() => {
                                            alert("Account created successfully!");
                                            console.log(userCreds.user);
                                            props.navigation.navigate("SignIn");
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        });
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        } else {
                            alert("Fields can not be empty!");
                        }
                    }}
                />
            </Card>
        </View>
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
});

export default SignUpScreen;