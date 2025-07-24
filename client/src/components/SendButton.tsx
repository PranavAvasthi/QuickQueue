import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SendButtonProps } from '../types/types';

export default function SendButton({ onPress, disabled }: SendButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-12 h-12 rounded-full items-center justify-center ${
        !disabled ? 'bg-blue-500' : 'bg-gray-600'
      }`}
      activeOpacity={0.8}
    >
      <Text className={`text-lg ${!disabled ? 'text-white' : 'text-gray-400'}`}>
        ➤
      </Text>
    </TouchableOpacity>
  );
}
