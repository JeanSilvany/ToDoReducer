import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { TextInput, ListRenderItemInfo, TouchableOpacity } from "react-native";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { EvilIcons } from "@expo/vector-icons";

import LottieView from "lottie-react-native";

import {
  ButtonTitle,
  Container,
  Content,
  Description,
  EmptyButton,
  EmptyContainer,
  EmptyDescription,
  EmptyTitle,
  Header,
  IconContainer,
  ModalContainer,
  Separator,
  Title,
  TopSection,
} from "./styles";

import { FlatList } from "react-native";
import { Card } from "../../components/Card";

import { Modalize } from "react-native-modalize";
import { useTheme } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { MotiView } from "moti";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" />
    <Transition.Change />
    <Transition.Out type="fade" />
  </Transition.Together>
);

interface CardProps {
  id: string;
  text: string;
  done: boolean;
}

const initialState = {
  items: [],
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "DONE_TASK":
      return {
        ...state,
        items: state.items.map((element) => {
          if (element.id === action.payload) element.done = !element.done;

          return element;
        }),
      };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const Home = () => {
  console.log("Home Render");

  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  // const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef(null);

  const modalizeRef = useRef<Modalize>(null);
  const transitionRef = useRef<TransitioningView>(null);

  const animation = useRef(null);

  const { colors } = useTheme();

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  const handleAddTask = async () => {
    if (!inputRef?.current) return;

    dispatch({
      type: "ADD_TASK",
      payload: { id: uuidv4(), text: inputRef?.current, done: false },
    });
  };

  const handleRemoveTask = (id) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: id,
    });
  };

  const handleDoneTask = (id) => {
    dispatch({
      type: "DONE_TASK",
      payload: id,
    });
  };

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CardProps>) => (
      <MotiView
        key={index}
        from={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <Card
          data={item}
          handleRemoveTask={handleRemoveTask}
          handleDoneTask={handleDoneTask}
        />
      </MotiView>
    ),
    []
  );

  useEffect(() => {
    transitionRef.current?.animateNextTransition();
  }, [tasks.items.length]);

  return (
    <Container>
      <Transitioning.View
        transition={transition}
        ref={transitionRef}
        style={{ flex: 1 }}
      >
        <Header>
          <TopSection>
            <Title>Tasks</Title>
            {tasks.items.length ? (
              <IconContainer onPress={handleOpenModal}>
                <EvilIcons name="pencil" size={24} color="black" />
              </IconContainer>
            ) : null}
          </TopSection>
          <Description>Notes:</Description>
        </Header>

        <Separator />

        <Content>
          <FlatList
            data={tasks.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
            }}
            ListEmptyComponent={() => (
              <EmptyContainer>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  source={require("../../assets/animations/notfound.json")}
                />

                <EmptyTitle>Add your first note</EmptyTitle>

                <EmptyDescription>
                  Relax and write something beautiful
                </EmptyDescription>

                <EmptyButton onPress={handleOpenModal}>
                  <ButtonTitle>Add note</ButtonTitle>
                </EmptyButton>
              </EmptyContainer>
            )}
          />
        </Content>
      </Transitioning.View>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        scrollViewProps={{
          keyboardShouldPersistTaps: "always",
        }}
        modalStyle={{ backgroundColor: colors.background.secondary }}
      >
        <ModalContainer>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderBottomWidth: 1,
              borderColor: colors.line,
              padding: 10,
              borderRadius: 8,
            }}
            placeholder="Enter your note"
            onChangeText={(value) => (inputRef.current = value)}
          />

          <TouchableOpacity
            style={{
              height: 50,
              margin: 12,
              elevation: 3,
              padding: 10,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.secondary,
              borderColor: colors.checkbox.border,
            }}
            onPress={handleAddTask}
          >
            <ButtonTitle>Add note</ButtonTitle>
          </TouchableOpacity>
        </ModalContainer>
      </Modalize>
    </Container>
  );
};
