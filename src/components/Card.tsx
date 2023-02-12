import React, { FC, memo } from 'react';
import { TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Ionicons } from '@expo/vector-icons';

interface ItemProps {
  id: string;
  text: string;
  done: boolean;
}

interface CardProps {
  data: ItemProps;
  handleDoneTask: (id: string) => void;
  handleRemoveTask: (id: string) => void;
}

export const Card: FC<CardProps> = memo(
  ({ data, handleDoneTask, handleRemoveTask }) => {
    console.log('Card Render');

    const { colors } = useTheme();
    const [checkboxState, setCheckboxState] = React.useState(data.done);

    return (
      <Container>
        <BouncyCheckbox
          size={24}
          fillColor={colors.checkbox.border}
          unfillColor={colors.checkbox.background}
          text={data.text}
          onPress={() => {
            handleDoneTask(data.id);
            setCheckboxState((oldValue) => !oldValue);
          }}
          textContainerStyle={{ flex: 1, marginRight: 8 }}
          style={{ flex: 1 }}
          innerIconStyle={{ borderWidth: 2 }}
          isChecked={checkboxState}
          disableBuiltInState
        />
        <TouchableOpacity
          onPress={() => handleRemoveTask(data.id)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons size={24} name="ios-trash-outline" color={'red'} />
        </TouchableOpacity>
      </Container>
    );
  }
);
