import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Alert, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBookMark, addCategory } from '../../data/slice/bookmarkSlice';
import { RootState } from '../../data/store/store';

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
      <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{fontSize: 22, color: '#000'}}>Title: {title}</Text>
          <Text style={{fontSize: 22, color: '#000', marginTop: 10}}>URL: {url}</Text>
          <Text style={{fontSize: 22, color: '#000', marginTop: 10}}>Category: {category}</Text>
          <View style={{marginVertical: 10}}/>
          <Button title="Close" onPress={handleModalClose} />
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DetailModal;
