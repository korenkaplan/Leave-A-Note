import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert, Slide } from 'native-base';
import { Text } from '@rneui/base';

interface Props {
  title: string;
  status: string;
  isShowing: boolean;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const CustomSlide: React.FC<Props> = ({ title, status, isShowing, placement }) => {
  return (
    <Slide in={isShowing} placement={placement}>
      <Alert style={styles.alertContainer} status={status} safeAreaTop={4}>
        <Text style={styles.titleText} color="error.600" fontWeight="medium">
          {title}
        </Text>
      </Alert>
    </Slide>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    justifyContent: 'center',
    // Add additional styles as needed
  },
  titleText: {
    // Add additional styles for the title text
  },
});

export default CustomSlide;
