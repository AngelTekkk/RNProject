import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

import { authSignUpUser } from "../../redux/auth/authOperations";

const bgImage = require("../../../assets/images/bg.jpg");

const initialState = {
  login: "",
  email: "",
  password: "",
  photoUri: "",
};

export default function RegistrationScreen({ navigation }) {
  const [focus, setFocus] = useState("");
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { width } = useWindowDimensions();

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

  useEffect(() => {
    if (state.login && state.password && state.email && state.photoUri) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [state]);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const resizedPhoto = await manipulateAsync(
      photo.uri,
      [{ resize: { width: 480, height: 480 } }, { flip: FlipType.Horizontal }],
      { format: SaveFormat.JPEG }
    );
    setState((prevState) => ({ ...prevState, photoUri: resizedPhoto.uri }));
    setIsCameraEnabled(false);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setFocus("");
  };

  const onSubmitForm = () => {
    dispatch(authSignUpUser(state));
    hideKeyboard();
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        hideKeyboard();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.formContainer,
                paddingBottom: isKeyboardShown ? 0 : 78,
              }}
            >
              {isCameraEnabled ? (
                <Camera
                  style={{ ...styles.camera, right: width / 2 - 120 }}
                  type={CameraType.front}
                  ref={setCamera}
                >
                  <Pressable style={styles.cameraBtn} onPress={takePhoto}>
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </Pressable>
                </Camera>
              ) : (
                <View
                  style={{
                    ...styles.addAvatar,
                    right: width / 2 - 60,
                  }}
                >
                  <Image
                    style={styles.avatarImg}
                    source={{ uri: state.photoUri }}
                  />
                  <Pressable
                    style={{
                      ...styles.addAvatarBtn,
                      borderColor: state.photoUri ? "#E8E8E8" : "#FF6C00",
                      backgroundColor: state.photoUri
                        ? "#FFFFFF"
                        : "transparent",
                    }}
                    onPress={() => {
                      if (state.photoUri) {
                        setState((prevState) => ({
                          ...prevState,
                          photoUri: null,
                        }));
                      }
                      setIsCameraEnabled(true);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.addAvatarBtnTitle,
                        color: state.photoUri ? "#BDBDBD" : "#FF6C00",
                        transform: state.photoUri
                          ? [{ rotate: "-45deg" }]
                          : [{ rotate: "0deg" }],
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
              )}

              <Text style={styles.title}>Регистрация</Text>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focus === "login" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Логин"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setFocus("login");
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    emailRef.current.focus();
                  }}
                  value={state.login}
                />
                <TextInput
                  ref={emailRef}
                  style={{
                    ...styles.input,
                    borderColor: focus === "email" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setFocus("email");
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  value={state.email}
                />
                <TextInput
                  ref={passwordRef}
                  style={{
                    ...styles.input,
                    paddingRight: 90,
                    marginBottom: isKeyboardShown ? 32 : 43,
                    borderColor: focus === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    setFocus("password");
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    setFocus("");
                  }}
                  value={state.password}
                  secureTextEntry={!isPwdShown}
                />
                <Pressable style={styles.pwdBtn}>
                  <Text
                    style={styles.pwdBtnTitle}
                    onPress={() => {
                      setIsPwdShown((state) => !state);
                    }}
                  >
                    {isPwdShown ? "Скрыть" : "Показать"}
                  </Text>
                </Pressable>
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
                      Зарегистрироваться
                    </Text>
                  </Pressable>
                )}
              </View>
              {!isKeyboardShown && (
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
                </Pressable>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto_medium",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 32,
  },
  addAvatar: {
    position: "absolute",
    top: -60,
  },
  avatarImg: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: "absolute",
    bottom: 14,
    right: -13,
    width: 26,
    height: 26,
    borderRadius: 100,
    borderColor: "#FF6C00",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addAvatarBtnTitle: {
    fontFamily: "Roboto_thin",
    fontSize: 23,
    lineHeight: 25,
    color: "#FF6C00",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    padding: 16,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
  },
  pwdBtn: {
    position: "absolute",
    right: 16,
    top: 148,
  },
  pwdBtnTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18,
    color: "#1B4371",
    textAlign: "center",
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
    lineHeight: 18,
  },
  link: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18,
    color: "#1B4371",
    textAlign: "center",
  },
  camera: {
    position: "absolute",
    top: -180,
    height: 240,
    width: 240,
    marginBottom: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 8,
  },
  cameraBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    marginRight: 10,
  },
});
