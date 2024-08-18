import React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../data/store/store'

export default function BookmarkManager() {

  const categories = useSelector((state: RootState) => state.bookmarks.categories)
  const dispatch = useDispatch()

  console.log("categories ", categories)

  return (
    <View>

    </View>
  )
}
