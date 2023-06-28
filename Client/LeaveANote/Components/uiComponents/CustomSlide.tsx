/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { Alert, Slide } from 'native-base';
import { Text } from '@rneui/base';
interface Props {
    title: string;
    status: string;
    isShowing: boolean;
    placement: 'top' | 'bottom'| 'left' | 'right';
}

const CustomSlide: React.FC<Props> = ({ title, status, isShowing, placement }) => {
    return (
        <Slide in={isShowing} placement={placement}>
            <Alert justifyContent="center" status={status} safeAreaTop={4}>
                <Text  color="error.600" fontWeight="medium">
                    {title}
                </Text>
            </Alert>
        </Slide>
    );
};

export default CustomSlide;
