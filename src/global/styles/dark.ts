import { StyleSheet } from 'react-native';

export default {
  colors: {
    primary: '#24242D',
    background: {
      primary: '#1E1F25',
      secondary: '#FFFFFF',
    },
    title: '#FFFFFF',
    description: '#9494B8',
    text: '#DADADA',
    line: '#29292F',
    checkbox: {
      border: '#2B2D37',
      background: '#0E0E11',
    },
    secondary: '#F8C670',
  },
};

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
