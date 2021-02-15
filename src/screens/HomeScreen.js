import React, { useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Card, Button, Text, Avatar, Input, ListItem } from "react-native-elements";
import HeaderHome from "../components/HeaderHome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PostCard from "./../components/PostCard";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {
    const netinfo = useNetInfo();
    if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
        alert("No Internet!");
    }
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    const loadPosts = async () => {
        setLoading(true);
        firebase
            .firestore()
            .collection("posts")
            .orderBy("created_at", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPosts(temp_posts);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    };

    useEffect(() => {
        loadPosts();
    }, []);


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
                        <Input
                            placeholder="What's On Your Mind?"
                            leftIcon={<Entypo name="pencil" size={24} color="black" />}
                            onChangeText={(currentText) => {
                                setInput(currentText);
                            }}
                        />
                        <Button
                            title="Post"
                            type="solid"
                            buttonStyle={styles.button}
                            onPress={function () {
                                setLoading(true);
                                firebase
                                    .firestore()
                                    .collection("posts")
                                    .add({
                                        userId: auth.CurrentUser.uid,
                                        body: input,
                                        author: auth.CurrentUser.displayName,
                                        created_at: firebase.firestore.Timestamp.now(),
                                        likes: [],
                                        comments: [],
                                    })
                                    .then(() => {
                                        setLoading(false);
                                        alert("Post created Successfully!");
                                    })
                                    .catch((error) => {
                                        setLoading(false);
                                        alert(error);
                                    });
                            }}
                        />
                    </Card>
                    <ActivityIndicator size="large" color="red" animating={loading} />

                    <FlatList
                        data={posts}
                        renderItem={({ item }) => {
                            return (
                                <PostCard
                                    color="#16A085"
                                    author={item.data.author}
                                    body={item.data.body}
                                />
                            );
                        }}
                    />
                </View>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
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

export default HomeScreen;