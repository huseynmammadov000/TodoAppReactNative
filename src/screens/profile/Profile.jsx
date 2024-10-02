import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StyledText, StyledTouchableOpacity, StyledView } from '../../common/StyledComponents'
import { storage } from '../../utils/MMKVStorage'

const Profile = () => {
  return (
    <StyledView>
      <StyledTouchableOpacity className='w-auto bg-red-500 p-4 m-4 rounded-lg'
      onPress={()=>{
        storage.delete("token")
      }}>
        <StyledText >Logout</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

export default Profile

const styles = StyleSheet.create({})