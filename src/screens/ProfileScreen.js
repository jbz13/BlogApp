import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, Card, Avatar } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/HeaderHome";
const ProfileScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <HeaderHome
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                    <Card>
                        <View>
                            <Image source={require("./../../assets/myphoto.jpg")} style={styles.imageStyle} resizeMode="contain" />
                        </View>
                        <Card.Divider />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                containerStyle={{ backgroundColor: "seagreen" }}
                                rounded
                                icon={{
                                    name: "address-book",
                                    type: "font-awesome",
                                    color: "white",
                                }}
                                activeOpacity={1}
                            />
                            <Text style={{ paddingHorizontal: 10 }}>
                                Name: Jawad Zamal
                            </Text>


                        </View>
                        <Card.Divider />

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                containerStyle={{ backgroundColor: "seagreen" }}
                                rounded
                                icon={{
                                    name: "address-book",
                                    type: "font-awesome",
                                    color: "white",
                                }}
                                activeOpacity={1}
                            />
                            <Text style={{ paddingHorizontal: 10 }}>
                                SID: 170042061
                            </Text>

                        </View>
                        <Card.Divider />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar
                                containerStyle={{ backgroundColor: "seagreen" }}
                                rounded
                                icon={{
                                    name: "envelope",
                                    type: "font-awesome",
                                    color: "white",
                                }}
                                activeOpacity={1}
                            />
                            <Text style={{ paddingHorizontal: 10 }}>
                                Email: jawad13.jz@gmail.com
                            </Text>
                        </View>
                        <Card.Divider />
                        <View>
                            <Button
                                title=' Delete Account'
                                type="solid"
                                buttonStyle={styles.button}
                                onPress={
                                    async function () {
                                        auth.setIsLoggedIn(false);
                                    }
                                }
                            />
                        </View>
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "seagreen",
    },
    viewStyle: {
        flex: 1,
    },
    button: {
        backgroundColor: "#16A085",
        borderColor: "#16A085",
        borderRadius: 20,
    },
    imageStyle: {
        height: 200,
        width: 200,
        alignSelf: "center",
    },
});

export default ProfileScreen;