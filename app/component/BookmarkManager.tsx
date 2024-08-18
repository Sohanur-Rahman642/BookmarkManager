import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {  useSelector } from 'react-redux'
import { RootState } from '../data/store/store'
import AddModal from './Modal/AddModal'
import { BookMark } from '../data/slice/types'
import DetailModal from './Modal/DetailModal'
import WebView from 'react-native-webview'
import WebViewBottomSheet from './Modal/WebViewBottomSheet'


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

  const [isOpenWebView, setOpenWebView] = useState<boolean>(false)

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

  const onSelectBookmark = (item: BookMark, category: string) => {
    setClickedBookMarks({
      title: item?.title,
      url: item?.url,
      category: category
    })
  }

  const handlePressDetails = (item : BookMark, category: string) => {
    console.log("item ", item)
    setDetailModalVisible(true)
    onSelectBookmark(item, category)
  }

  const openWebView = (item: BookMark, category: string) => {
      onSelectBookmark(item, category)
      setOpenWebView(true)
  }

  const closeWebView = () => {
    setOpenWebView(false)
  }

  const renderBookmarks = ({ item: bookmark }: { item: BookMark }, category : string) => {
    return (
      <View  style={styles.bookmarkContainer}>
      <TouchableOpacity onPress={() => openWebView(bookmark, category)}>
        <Text style={styles.bookmarkTitle}>{bookmark.title}</Text>
      </TouchableOpacity>

        <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={() => handlePressDetails(bookmark, category)} >
            <Text>Details</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderCategoryItem = ({ item: category }: { item: string }) => {
    if (categories[category].bookmarks.length === 0) {
      return null; 
    }

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
          data={categories[category].bookmarks}
          renderItem={(props) => renderBookmarks(props, category)}
          keyExtractor={(item, index) => index} 
          style={styles.bookmarkList}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>BookMark Manager</Text>
      <FlatList
        data={Object.keys(categories)}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index}
        style={styles.categoryList}
        showsVerticalScrollIndicator={false}
      />
      <AddModal visible={isModalVisible} handleModalClose={closeAddModal} />
      <DetailModal 
        visible={isDetailModalVisible}
        handleModalClose={closeDetailModal}
        title={clickedBookMarks?.title}
        url={clickedBookMarks?.url}
        category={clickedBookMarks?.category}
      />
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <WebViewBottomSheet visible={isOpenWebView} onClose={closeWebView}  url={clickedBookMarks?.url} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  appTitle: {textAlign: 'center', fontSize: 32, fontWeight: 'bold'},
  categoryList: {
    flex: 1,
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookmarkList: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10
  },
  bookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  bookmarkTitle: {
    fontSize: 16,
    color: 'blue',
  },
  detailsButton: {
    padding: 5,
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 70,
    backgroundColor: 'blue',
    borderRadius: 30,
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
