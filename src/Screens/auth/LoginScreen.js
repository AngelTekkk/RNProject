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
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

const bgImage = require("../../../assets/images/bg.jpg");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation, route }) {
  const [focus, setFocus] = useState("");
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const passwordRef = useRef();

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
    if (state.password && state.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [state]);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setFocus("");
  };

  const onSubmitForm = () => {
    dispatch(authSignInUser(state));
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
              <Text style={styles.title}>Войти</Text>
              <View style={styles.form}>
                <TextInput
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
                  >
                    <Text
                      style={{
                        ...styles.btnTitle,
                        color: isDisabled ? "#BDBDBD" : "#FFFFFF",
                      }}
                    >
                      Войти
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
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.link}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
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
    paddingTop: 32,
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
  form: {},
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
    top: 82,
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
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18,
    color: "#FFFFFF",
  },
  link: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18,
    color: "#1B4371",
    textAlign: "center",
  },
});
