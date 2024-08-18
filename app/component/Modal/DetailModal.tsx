import React from 'react';
import { Modal, StyleSheet, Text, Alert, View, Button } from 'react-native';

interface ModalProps {
  visible: boolean, 
  title: string,
  url: string,
  category: string,
  handleModalClose: () => void
}

const DetailModal: React.FC<ModalProps> = ({ visible, title, url, category, handleModalClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleModalClose();
      }}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.text}>Title: {title}</Text>
          <Text style={styles.text}>URL: {url}</Text>
          <Text style={styles.text}>Category: {category}</Text>
          <View style={styles.separator} />
          <Button title="Close" onPress={handleModalClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 22,
    color: '#000',
    marginTop: 10,
  },
  separator: {
    marginVertical: 10,
  },
});

export default DetailModal;
