import React, {Component} from "react"
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import axios from "axios";
import getAPI from "./src/contstant";
import Geolocation from "@react-native-community/geolocation";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {
                main: {
                    temp: 10,
                    feels_like: 8,
                    humidity: 97
                },
                visibility: 1000,
                weatherState: {
                    main: "Hot",
                    description: "broken hot"
                },
                coord: {
                    lan: 0,
                    lon: 0
                }
            }
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
         data=>{

             axios.get(getAPI(data.coords.latitude, data.coords.longitude))
                 .then((res) => {
                     const {main, visibility, weather, name, coord} = res.data;
                     const weatherState = weather[0];
                     this.setState({
                         weather : {main, visibility, weatherState, name, coord},
                     })
                 })
                 .catch((err) => {
                     alert(err)
                 });
         },
         err => {
             alert(err.message)
         },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        )
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>

                <ImageBackground
                    style={style.imageBack}
                    source={
                        {uri: "https://i.pinimg.com/564x/1c/08/ca/1c08cadb030cd96a3fbaf464bea9d128.jpg"}
                    } onError={(err) => {alert(err)}}
                    resizeMode={"cover"}>
                    <View style={style.viewStyle}>
                        <View>
                            <Text style={{
                                color: "#fff",
                                fontSize: 24
                            }}>{this.state.weather.name}</Text>
                            <View style={{
                            }}>
                                <Text style={{
                                    color: "#fff",
                                    paddingTop: 15,
                                    fontWeight: "bold",
                                    fontSize: 100
                                }}>{this.state.weather.main["temp"]}°</Text>


                                <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    marginTop: 5,
                                }}>{this.state.weather.weatherState.main}</Text>

                                <Text style={{
                                    color: "#fff",
                                    marginTop: 5,
                                    fontSize: 15,
                                }}>{this.state.weather.weatherState.description}</Text>
                            </View>
                        </View>

                        <View style={{
                            borderRadius: 15,
                            borderStyle: "solid",
                            borderColor: "#fff",
                            borderWidth: 1,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            padding: 10,
                            marginBottom: 30,
                            backgroundColor: "rgba(255, 255, 255, 0.2)"
                        }}>
                            <View style={{
                                alignItems: "center"
                            }}>
                                <Text style={style.bottomSectionDataTextStyle}>{this.state.weather.main["humidity"]}%</Text>
                                <Text style={style.bottomSectionNameTextStyle}>Nem</Text>
                            </View>

                            <View style={{
                                alignItems: "center"
                            }}>
                                <Text style={style.bottomSectionDataTextStyle}>{this.state.weather.visibility / 1000} km</Text>
                                <Text style={style.bottomSectionNameTextStyle}>Görüş</Text>
                            </View>

                            <View style={{
                                alignItems: "center"
                            }}>
                                <Text style={style.bottomSectionDataTextStyle}>{this.state.weather.main["feels_like"]}°</Text>
                                <Text style={style.bottomSectionNameTextStyle}>Hissedilen</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const style = StyleSheet.create({
    imageBack: {
        flex: 1,
    },
    viewStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        justifyContent: "space-between"
    },
    bottomSectionDataTextStyle: {
        color: "#fff"
    },
    bottomSectionNameTextStyle: {
        color: "#fff"
    }
});
