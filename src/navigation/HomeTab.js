import React from "react";
import { createMaterialBottomTabNavigator, TabBarBottom } from "@react-navigation/material-bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./../screens/HomeScreen";
import NotificationScreen from "./../screens/NotificationScreen";

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
    return (
        <HomeTab.Navigator initialRouteName="Home" style={{ backgroundColor: "seagreen" }}>

            <HomeTab.Screen
                name="Home"
                backgroundColor="#16A085"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarBackgroundColor: "#16A085",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" color="white" size={26} />
                        ) : (
                                <AntDesign name="home" color="white" size={22} />
                            ),
                }}
            />
            <HomeTab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="ios-notifications" size={26} color="white" />
                        ) : (
                                <Ionicons
                                    name="ios-notifications-outline"
                                    size={22}
                                    color="white"
                                />
                            ),
                }}
            />

        </HomeTab.Navigator>
    );
};

export default HomeTabScreen;