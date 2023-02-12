import React, { useCallback, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TextInput, TouchableOpacity, Button } from 'react-native';

import {
  Container,
  Description,
  Header,
  Icon,
  IconContainer,
  Separator,
  Title,
  TopSection,
} from './styles';

import { FlatList } from 'react-native';
import { Card } from '../../components/Card';

import { Modalize } from 'react-native-modalize';

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

  const handleOpenModal = () => {
    modalizeRef.current?.open();
  };

  const handleAddTask = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: { id: uuidv4(), text: description, done: false },
    });
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
          <IconContainer onPress={handleOpenModal}>
            <Icon>🚀</Icon>
          </IconContainer>
        </TopSection>
        <Description>Notes:</Description>
      </Header>

      <Separator />

      <FlatList
        data={tasks.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        HeaderComponent={<TextInput style={{ width: '100%' }} />}
        FooterComponent={<TextInput style={{ width: '100%' }} />}
      >
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
          }}
          onChangeText={(value) => setDescription(value)}
        />

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={handleAddTask}
        >
          <Title>Adicionar</Title>
        </TouchableOpacity>
      </Modalize>
    </Container>
  );
};
