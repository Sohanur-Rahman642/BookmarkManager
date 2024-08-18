import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Alert, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBookMark, addCategory } from '../../data/slice/bookmarkSlice';
import { RootState } from '../../data/store/store';

interface ModalProps {
  visible: boolean
  handleModalClose: () => void
}

const AddModal: React.FC<ModalProps> = ({ visible, handleModalClose }) => {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState<boolean>(
    false
  );

  const categories = useSelector((state: RootState) => state.bookmarks.categories)

  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if(newCategoryName){
        setShowNewCategoryInput(true)
        setSelectedCategory(newCategoryName)
        dispatch(addCategory(newCategoryName))
        
    }
  }

  const handleAddBookMark = () => {
    if (title && url && (selectedCategory || newCategoryName)) {
      const category = showNewCategoryInput ? newCategoryName : selectedCategory;
      dispatch(addBookMark({ category, bookmark: { title, url } }));
    }
  };


  const onClose = () => {
    handleModalClose()
    setTitle('')
    setUrl('')
    setSelectedCategory('')
    setNewCategoryName('')
  }

  const onCategoryChange = (itemValue: any) => {
    setSelectedCategory(itemValue)
    setNewCategoryName(itemValue)
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onClose();
      }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            maxLength={30}
            style={{ borderBottomWidth: 1, marginBottom: 16 }}
          />
          <TextInput
            placeholder="URL"
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            style={{ borderBottomWidth: 1, marginBottom: 16 }}
          />

          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View style={{width: '70%'}}>
              <TextInput
                placeholder="Category"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
              />
            </View>

         <TouchableOpacity 
            style={{width: '30%', justifyContent: 'center', alignItems:'center'}}
            onPress={handleAddCategory}>
              <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 1, width: 100}}>
                <Text style={{ color: '#000', fontSize: 40}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <SelectPicker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => onCategoryChange(itemValue)}
              >
                <SelectPicker.Item label="Select a category" value="" />
                {Object.keys(categories).map((category) => (
                  <SelectPicker.Item label={category} value={category} key={category} />
                ))}
          </SelectPicker> 
          
          <View style={{marginVertical: 10}}/>
          <Button title="Add Bookmark" onPress={handleAddBookMark} />
          <View style={{marginVertical: 10}}/>
          <Button title="Close" onPress={onClose} />
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

export default AddModal;
