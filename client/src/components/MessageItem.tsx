import React from 'react';
import { View, Text } from 'react-native';
import { MessageItemProps } from '../types/types';
import { formatTime, isSystemMessage, isOwnMessage } from '../utils';

export default function MessageItem({
  message,
  currentUsername,
}: MessageItemProps) {
  const isSystem = isSystemMessage(message);
  const isOwn = isOwnMessage(message, currentUsername);

  if (isSystem) {
    return (
      <View className="px-4 py-2 items-center">
        <View className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
          <Text className="text-gray-400 text-sm text-center">
            {message.text}
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-1">
            {formatTime(message.timestamp)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`px-4 py-2 ${isOwn ? 'items-end' : 'items-start'}`}>
      <View className="max-w-[280px]">
        {!isOwn && (
          <Text className="text-blue-400 text-sm font-medium mb-1 ml-3">
            {message.username}
          </Text>
        )}
        <View
          className={`px-4 py-3 rounded-2xl ${
            isOwn
              ? 'bg-blue-500 rounded-tr-md'
              : 'bg-gray-800 border border-gray-700 rounded-tl-md'
          }`}
        >
          <Text
            className={`text-base ${isOwn ? 'text-white' : 'text-gray-100'}`}
          >
            {message.text}
          </Text>
        </View>
        <Text
          className={`text-xs text-gray-500 mt-1 ${
            isOwn ? 'text-right mr-3' : 'text-left ml-3'
          }`}
        >
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}
