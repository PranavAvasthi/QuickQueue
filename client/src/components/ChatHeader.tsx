import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChatHeaderProps } from '../types/types';

export default function ChatHeader({
  username,
  isConnected,
  onlineUsers,
  onBackPress,
}: ChatHeaderProps) {
  return (
    <View className="bg-gray-800 border-b border-gray-700 px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={onBackPress} className="mr-4 p-2 -ml-2">
            <Text className="text-gray-300 text-xl">←</Text>
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">
              QuickQueue Chat
            </Text>
            <View className="flex-row items-center mt-1">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${
                  isConnected ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <Text className="text-gray-400 text-sm">
                {isConnected ? `${onlineUsers.length} online` : 'Connecting...'}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-blue-400 font-medium">{username}</Text>
          <Text className="text-gray-500 text-xs">You</Text>
        </View>
      </View>
    </View>
  );
}
