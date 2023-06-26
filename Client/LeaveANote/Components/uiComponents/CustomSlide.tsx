/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { Alert, Slide } from 'native-base';
import { Text } from '@rneui/base';
interface Props {
    title: string;
    status: string;
    isShowing: boolean;
}

const CustomSlide: React.FC<Props> = ({ title, status, isShowing }) => {
    return (
        <Slide in={isShowing} placement="left">
            <Alert justifyContent="center" status={status} safeAreaTop={4}>
                <Text h4 color="error.600" fontWeight="medium">
                    {title}
                </Text>
            </Alert>
        </Slide>
    );
};

export default CustomSlide;
