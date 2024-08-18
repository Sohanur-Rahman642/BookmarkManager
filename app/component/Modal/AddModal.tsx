import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Alert, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBookMark, addCategory } from '../../data/slice/bookmarkSlice';
import { RootState } from '../../data/store/store';

interface ModalProps {
  visible: boolean;
  handleModalClose: () => void;
}

const AddModal: React.FC<ModalProps> = ({ visible, handleModalClose }) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState<boolean>(false);

  const categories = useSelector((state: RootState) => state.bookmarks.categories);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (newCategoryName) {
      setShowNewCategoryInput(true);
      setSelectedCategory(newCategoryName);
      dispatch(addCategory(newCategoryName));
    }
  };

  const handleAddBookMark = () => {
    if (title && url && (selectedCategory || newCategoryName)) {
      const category = showNewCategoryInput ? newCategoryName : selectedCategory;
      dispatch(addBookMark({ category, bookmark: { title, url } }));
      onClose(); 
    }
  };

  const onClose = () => {
    handleModalClose();
    setTitle('');
    setUrl('');
    setSelectedCategory('');
    setNewCategoryName('');
  };

  const onCategoryChange = (itemValue: string) => {
    setSelectedCategory(itemValue);
    setNewCategoryName(itemValue);
  };

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
          <TextInput
            placeholder="Title"
            placeholderTextColor='black'
            value={title}
            onChangeText={setTitle}
            maxLength={30}
            style={styles.input}
          />
          <TextInput
            placeholder="URL"
            placeholderTextColor='black'
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            style={styles.input}
          />
          <View style={styles.categoryContainer}>
            <View style={styles.categoryInputContainer}>
              <TextInput
                placeholder="Category"
                placeholderTextColor='black'
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                style={styles.input}
              />
            </View>
            <TouchableOpacity 
              style={styles.addCategoryButton}
              onPress={handleAddCategory}
            >
              <View style={styles.addCategoryInner}>
                <Text style={styles.addCategoryText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <SelectPicker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => onCategoryChange(itemValue)}
            dropdownIconColor={'black'}
          >
            <SelectPicker.Item label="Select a category" value="" />
            {Object.keys(categories).map((category) => (
              <SelectPicker.Item label={category} value={category} key={category} />
            ))}
          </SelectPicker> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddBookMark} >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

           
          </View>
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
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    color: 'black'
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryInputContainer: {
    width: '70%',
  },
  addCategoryButton: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCategoryInner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
  },
  addCategoryText: {
    color: '#000',
    fontSize: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  cancelButton: {
    borderWidth: 1,
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'red',
    backgroundColor: 'red',
  },
  cancelButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButton: {
    borderWidth: 1,
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'blue',
    backgroundColor: 'blue',
  },
  saveButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AddModal;
