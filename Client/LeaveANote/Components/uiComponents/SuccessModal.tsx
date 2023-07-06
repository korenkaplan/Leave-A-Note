/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, ModalContent, ModalFooter, ModalButton } from 'react-native-modals'
import { startCase } from 'lodash';
import { Text } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces';
import animationData from '../../assets/lottie.Animation/success.json';
import LottieView from 'lottie-react-native';
import DividerWithText from './DividerWithText';
interface Props {
  title?: string;
  body?: string;
  footerTitle?: string;
  onSwipe(): void;
  isVisible: boolean
}
const SuccessModal: React.FC<Props> = ({ title, footerTitle, body, onSwipe, isVisible }) => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;
  const { buttonMain, buttonAlt } = buttonTheme;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);
  return (
    <View>
      <Modal
        visible={isVisible}
        swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
        swipeThreshold={200} // default 100
        onSwipeOut={() => {
          onSwipe();
        }}
        modalStyle={styles.modalStylel}
        footer={
          <ModalFooter style={styles.ModalFooter} >
            <ModalButton textStyle={styles.ModalButtonText} text={startCase(footerTitle ? footerTitle : 'swipe to close')} />
          </ModalFooter>
        }
      >
        <ModalContent style={styles.modalContent}>
          <View style={{ height: 100, width: '100%' }}>
            <LottieView style={styles.lottieStyle} speed={1} source={animationData} loop={false} autoPlay />
          </View  >
          <View style={styles.bodyView}>
            <DividerWithText title={title? title: 'Success'} fontSize={20} />
            <Text style={styles.bodyText}>{body? body: ''}</Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};
const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    modalStylel: { borderWidth: 2, borderColor: primary, backgroundColor: background, minWidth: 220 },
    ModalButtonText: { color: buttonMain.text, fontSize: 14 },
    ModalFooter: { justifyContent: 'center', alignItems: 'center', backgroundColor: buttonMain.background },
    bodyText: {
      fontSize: 14, textAlign: 'center', color: text.secondary, marginTop: 10, maxWidth: 200
    },
    bodyView: {
      justifyContent: 'flex-end', alignItems: 'center', position: 'relative', top: 5
    },
    lottieStyle: {
      width: 180, position: 'absolute', bottom: -30, right: 0
    },
    modalContent: {
      alignItems: 'center', paddingTop: 0, justifyContent: 'space-between'
    }
  });
export default SuccessModal;
