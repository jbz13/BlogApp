import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "./src/screens/ProfileScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeTabScreen from "./src/navigation/HomeTab";

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";

const firebaseConfig = {
    apiKey: "AIzaSyDx2yuX-uL77cPO_Alu9UBf87U3VCTcnlM",
    authDomain: "blog-69e50.firebaseapp.com",
    databaseURL: "https://blog-69e50-default-rtdb.firebaseio.com",
    projectId: "blog-69e50",
    storageBucket: "blog-69e50.appspot.com",
    messagingSenderId: "220320945595",
    appId: "1:220320945595:web:e992263d1e4a56505ce09e",
    measurementId: "G-SV3YQHPGX7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const AppDrawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const AppDrawerScreen = () => {
    return (
        <AppDrawer.Navigator>
            <AppDrawer.Screen name="Home" component={HomeTabScreen} />
            <AppDrawer.Screen name="Profile" component={ProfileScreen} />
        </AppDrawer.Navigator>
    );
};

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName="SignIn">
            <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};

function App() {
    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {(auth) => (
                    <NavigationContainer>
                        {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
                    </NavigationContainer>
                )}
            </AuthContext.Consumer>
        </AuthProvider>
    );
}

export default App;
