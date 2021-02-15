import React from "react";
import { Header } from "react-native-elements";
import * as firebase from "firebase";
import { AuthContext } from "../providers/AuthProvider";

const HeaderHome = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <Header
                    backgroundColor="#16A085"

                    leftComponent={{
                        icon: "menu",
                        color: "#fff",
                        onPress: props.DrawerFunction,
                    }}
                    centerComponent={{ text: "BlogApp", style: { color: "#fff", fontSize: 20 } }}
                    rightComponent={{
                        icon: "lock-outline",
                        color: "#fff",
                        onPress: function () {
                            firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                })
                                .catch((error) => {
                                    alert(error);
                                });
                        },
                    }}
                />
            )}
        </AuthContext.Consumer>
    );
};

export default HeaderHome;