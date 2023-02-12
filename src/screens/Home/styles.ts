import styled from 'styled-components/native';
import { styles } from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  padding: 64px;
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

  background: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;

  elevation: 3;
`;

export const Icon = styled.Text``;

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background: ${({ theme }) => theme.colors.line};

  margin: 32px 0;
`;
