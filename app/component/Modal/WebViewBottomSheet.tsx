import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';


interface WebViewProps {
  visible: boolean
  onClose: () => void
  url: string
}

const WebViewBottomSheet: React.FC<WebViewProps> = ({visible, onClose,  url }) => {

  const handleCloseModal = () => {
    onClose()
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <WebView source={{ uri: url }} style={styles.webview} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
 
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: Dimensions.get('window').height * 0.9, 
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewBottomSheet;
