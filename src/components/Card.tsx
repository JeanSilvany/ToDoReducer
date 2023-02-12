import React, { FC, memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Container } from './styles';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
          innerIconStyle={{ borderWidth: 2 }}
          isChecked={checkboxState}
          disableBuiltInState
        />
        <TouchableOpacity onPress={() => handleRemoveTask(data.id)}>
          <Text>Apagar</Text>
        </TouchableOpacity>
      </Container>
    );
  }
);
