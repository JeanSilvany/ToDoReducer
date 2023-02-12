import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../global/styles/light';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 16px;
`;

export const Header = styled.View`
  width: 100%;
`;

export const TopSection = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 56px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title};

  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.description};
`;

export const IconContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  ...styles.shadow,
})`
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.secondary};

  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;

  elevation: 3;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.line};

  margin: 32px 0;
`;

export const ModalContainer = styled.View`
  padding: 16px;
`;

export const ButtonTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.background.primary};
`;

export const Content = styled.View`
  flex: 1;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const EmptyTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;

  color: ${({ theme }) => theme.colors.title};
`;

export const EmptyDescription = styled.Text`
  font-size: 16px;
  margin: 16px 0;

  color: ${({ theme }) => theme.colors.description};
`;

export const EmptyButton = styled.TouchableOpacity`
  margin: 12px;
  border-width: 1px;

  border: ${({ theme }) => theme.colors.checkbox.border};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.checkbox.border};

  padding: 16px;
  border-radius: 8px;

  justify-content: center;
  align-items: center;
`;
