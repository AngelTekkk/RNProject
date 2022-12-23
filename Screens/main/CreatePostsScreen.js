import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const initialState = {
  photoUri: null,
  photoName: "",
  photoLocation: null,
};

export default function CreatePostsScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [state, setState] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { width } = useWindowDimensions();

  const locationRef = useRef();

  useEffect(() => {
    (async () => {
      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      let { status: cameraStatus } = await Camera.getCameraPermissionsAsync();
      if (locationStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      if (cameraStatus !== "granted") {
        setErrorMsg("Permission to access camera was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onSubmitForm = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(state, location);
    hideKeyboard();
    setState(initialState);
    setIsDisabled(true);
    navigation.navigate("NestedPostsScreen", { state, location });
  };

  const handleDelete = () => {
    setState(initialState);
    setIsDisabled(true);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setState((prevState) => ({ ...prevState, photoUri: photo.uri }));
    if (state.photoLocation && state.photoName) {
      setIsDisabled(false);
    }
  };

  const handleChangeText = (value, inputName) => {
    setState((prevState) => ({ ...prevState, [inputName]: value }));
    if (inputName === "photoName") {
      if (state.photoLocation && state.photoUri && value) {
        setIsDisabled(false);
      }
    } else {
      if (state.photoName && state.photoUri) {
        setIsDisabled(false);
      }
    }
    if (!value) {
      setIsDisabled(true);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        hideKeyboard();
      }}
    >
      <View style={styles.container}>
        {state.photoUri ? (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: state.photoUri }}
              style={{ height: 240, borderRadius: 10 }}
            />
            <Pressable
              style={{ ...styles.photoBtn, right: width / 2 - 16 - 30 }}
              onPress={() => {
                setState((prevState) => ({
                  ...prevState,
                  photoUri: null,
                }));
                setIsDisabled(true);
              }}
            >
              <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        ) : (
          <Camera style={styles.camera} type={type} ref={setCamera}>
            <Pressable style={styles.flipBtn} onPress={toggleCameraType}>
              <MaterialIcons name="flip-camera-ios" size={24} color="#BDBDBD" />
            </Pressable>
            <Pressable style={styles.cameraBtn} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
            </Pressable>
          </Camera>
        )}
        <Text style={styles.cameraText}>
          {errorMsg
            ? errorMsg
            : state.photoUri
            ? "Редактировать фото"
            : "Загрузите фото"}
        </Text>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Название..."}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={(value) => {
                handleChangeText(value, "photoName");
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                locationRef.current.focus();
              }}
              value={state.photoName}
            />
            <View style={{ marginTop: 16 }}>
              <TextInput
                ref={locationRef}
                style={{
                  ...styles.input,
                  paddingLeft: 28,
                  fontFamily: "Roboto",
                  marginBottom: isKeyboardShown ? 32 : 43,
                }}
                placeholder={"Местность..."}
                placeholderTextColor={"#BDBDBD"}
                onChangeText={(value) => {
                  handleChangeText(value, "photoLocation");
                }}
                returnKeyType={"next"}
                value={state.photoLocation}
              />
              <View style={styles.pinImg}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </View>
            </View>
            {!isKeyboardShown && (
              <Pressable
                style={({ pressed }) => [
                  {
                    ...styles.btn,
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
                  },
                ]}
                onPress={() => {
                  onSubmitForm();
                }}
                disabled={isDisabled}
              >
                <Text
                  style={{
                    ...styles.btnTitle,
                    color: isDisabled ? "#BDBDBD" : "#FFFFFF",
                  }}
                >
                  Опубликовать
                </Text>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
        <View style={{ ...styles.delContainer, right: width / 2 - 35 }}>
          <Pressable
            style={({ pressed }) => [
              { ...styles.delBtn, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => {
              handleDelete();
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingBottom: 34,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  photoContainer: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  photoBtn: {
    position: "absolute",
    bottom: 240 / 2 - 30,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  camera: {
    height: 240,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cameraBtnContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  flipBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  cameraBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  cameraText: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    height: 50,
    fontFamily: "Roboto_medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  pinImg: {
    position: "absolute",
    top: 13,
  },
  btn: {
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
  },
  delContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    height: 83,
    paddingTop: 9,
  },
  delBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
