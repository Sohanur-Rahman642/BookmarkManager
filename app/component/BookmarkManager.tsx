import React, { useState } from 'react'
import { Button, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../data/store/store'
import AddModal from './Modal/AddModal'

export default function BookmarkManager() {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const categories = useSelector((state: RootState) => state.bookmarks.categories)
  const dispatch = useDispatch()

  console.log("categories ", categories)

  const openModal = () => {
    setIsModalVisible(true)
  };

  const closeModal = () => {
    setIsModalVisible(false)
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <Button title="Add Bookmark" onPress={openModal} />

        <AddModal visible={isModalVisible} handleModalClose={closeModal} />
    </View>
  )
}
