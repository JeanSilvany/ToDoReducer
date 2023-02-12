import { StyleSheet } from 'react-native';

export default {
  colors: {
    primary: '#F2F3FF',
    background: '#FFFFFF',
    title: '#000000',
    description: '#575767',
    text: '#575767',
    line: '#EBEBEB',
    checkbox: {
      border: '#DADADA',
      background: '#FFFFFF',
    },
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
