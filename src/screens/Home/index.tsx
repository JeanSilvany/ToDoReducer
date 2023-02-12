import React, { useCallback, useReducer, useRef, useState } from 'react';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { TextInput, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';

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
} from './styles';

import { FlatList } from 'react-native';
import { Card } from '../../components/Card';

import { Modalize } from 'react-native-modalize';
import { useTheme } from 'styled-components/native';

const initialState = {
  items: [],
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'DONE_TASK':
      return {
        ...state,
        items: state.items.map((element) => {
          if (element.id === action.payload) element.done = !element.done;

          return element;
        }),
      };

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const Home = () => {
  console.log('Home Render');

  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  const [description, setDescription] = useState('');

  const modalizeRef = useRef<Modalize>(null);
  const animation = useRef(null);

  const { colors } = useTheme();

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  const handleAddTask = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: { id: uuidv4(), text: description, done: false },
    });
    setDescription('');
  };

  const handleRemoveTask = (id) => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: id,
    });
  };

  const handleDoneTask = (id) => {
    dispatch({
      type: 'DONE_TASK',
      payload: id,
    });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        data={item}
        handleRemoveTask={handleRemoveTask}
        handleDoneTask={handleDoneTask}
      />
    ),
    []
  );

  return (
    <Container>
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
        {tasks.items.length ? (
          <FlatList
            data={tasks.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyContainer>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../../assets/animations/notfound.json')}
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
      </Content>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        modalStyle={{ backgroundColor: colors.background.secondary }}
      >
        <ModalContainer>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderBottomWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
            onChangeText={(value) => setDescription(value)}
            value={description}
          />

          <TouchableOpacity
            style={{
              height: 50,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
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
