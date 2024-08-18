import React, { useState } from 'react'
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../data/store/store'
import AddModal from './Modal/AddModal'
import { BookMark } from '../data/slice/types'
import DetailModal from './Modal/DetailModal'


export interface ClickedBookMarks {
  title: string, 
  url: string,
  category: string
}


export default function BookmarkManager() {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isDetailModalVisible, setDetailModalVisible] = useState<boolean>(false)
  const [clickedBookMarks, setClickedBookMarks] = useState<ClickedBookMarks>({
    title: '',
    url: '',
    category: ''
  })

 

  const categories = useSelector((state: RootState) => state.bookmarks.categories)

  const openModal = () => {
    setIsModalVisible(true)
  };

  const closeAddModal = () => {
    setIsModalVisible(false)
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false)
  }

  const handlePressDetails = (item : BookMark, category: string) => {
    console.log("item ", item)
    setDetailModalVisible(true)
    setClickedBookMarks({
      title: item?.title,
      url: item?.url,
      category: category
    })
  }

  
  const renderBookmarks = ({ item: bookmark }: { item: BookMark }, category : string) => {
    
   return(
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, marginHorizontal: 15}} >
      <Text style={{ fontSize: 16, color: 'blue' }}>{bookmark.title}</Text>

      <TouchableOpacity 
        style={{padding: 5, borderWidth: 1}} 
        onPress={() => handlePressDetails(bookmark, category)} >
        <Text>Details</Text></TouchableOpacity>
    </TouchableOpacity>
   )
  }

  const renderCategoryItem = ({ item: category }: { item: string }) => {
    if (categories[category].bookmarks.length === 0) {
      return null; 
    }
  
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{category}</Text>
        <FlatList
          data={categories[category].bookmarks}
          renderItem={(bookmark) => renderBookmarks(bookmark, category)}
          keyExtractor={(item, index) => item.title + index.toString()}
          style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <Button title="Add Bookmark" onPress={openModal} />
        <FlatList
          data={Object.keys(categories)}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          style={{ flex: 1 }}
        />

        <AddModal visible={isModalVisible} handleModalClose={closeAddModal} />
        <DetailModal 
            visible={isDetailModalVisible}
            handleModalClose={closeDetailModal}
            title={clickedBookMarks?.title}
            url={clickedBookMarks?.url}
            category={clickedBookMarks?.category}
        />
    </View>
  )
}
