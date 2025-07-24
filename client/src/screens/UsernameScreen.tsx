import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from '../types/types';

export default function UsernameScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (username.trim().length >= 2) {
      navigation.replace('chat', { username: username.trim() });
    }
  };

  const isValid = username.trim().length >= 2;

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Background Elements */}
      <View className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 opacity-5 rounded-full" />
      <View className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 opacity-5 rounded-full" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="pt-16 pb-8 px-8">
            <View className="items-center mb-8">
              {/* App Icon */}
              <View className="w-16 h-16 bg-blue-500 rounded-2xl justify-center items-center mb-4 shadow-lg">
                <Text className="text-xl">💬</Text>
              </View>
              <Text className="text-white text-lg font-medium">QuickQueue</Text>
            </View>

            <Text className="text-3xl font-bold text-white text-center mb-3">
              Choose Your Identity
            </Text>
            <Text className="text-gray-400 text-center text-base leading-6">
              Pick a username that represents you in the chat.{'\n'}
              Make it memorable and unique!
            </Text>
          </View>

          {/* Main Content */}
          <View className="flex-1 px-8 justify-center min-h-[300px]">
            {/* Username Input Section */}
            <View className="mb-8">
              <Text className="text-white font-semibold text-lg mb-4">
                Your Username
              </Text>

              {/* Input Container */}
              <View className={`relative ${isFocused ? 'mb-2' : 'mb-6'}`}>
                <TextInput
                  placeholder="Enter your username"
                  placeholderTextColor="#6B7280"
                  style={{
                    fontSize: 16,
                  }}
                  value={username}
                  onChangeText={setUsername}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full p-5 bg-gray-800 rounded-2xl text-white border-2 ${
                    isFocused
                      ? isValid
                        ? 'border-green-500'
                        : 'border-blue-500'
                      : 'border-gray-700'
                  }`}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  autoFocus={true}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />

                {/* Character Counter */}
                <Text
                  className={`absolute -bottom-5 right-2 text-sm ${
                    username.length > 15 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                >
                  {username.length}/20
                </Text>
              </View>

              {/* Validation Message */}
              {isFocused && (
                <Text
                  className={`text-sm mb-6 ${
                    isValid ? 'text-green-400' : 'text-gray-400'
                  }`}
                >
                  {isValid
                    ? '✓ Perfect! This username looks great'
                    : 'Username must be at least 2 characters long'}
                </Text>
              )}

              {/* Username Tips */}
              <View className="bg-gray-800 opacity-50 p-4 rounded-2xl border border-gray-700">
                <Text className="text-gray-300 font-medium mb-2">
                  💡 Pro Tips:
                </Text>
                <Text className="text-gray-400 text-sm leading-5">
                  • Keep it simple and easy to remember{'\n'}• Avoid spaces and
                  special characters{'\n'}• Make it unique to stand out in chat
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="px-8 pb-8 pt-4">
            {/* Join Chat Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              className={`rounded-2xl py-5 px-8 shadow-lg ${
                isValid ? 'bg-blue-500' : 'bg-gray-700'
              }`}
              activeOpacity={isValid ? 0.8 : 1}
            >
              <Text
                className={`text-center text-lg font-bold tracking-wide ${
                  isValid ? 'text-white' : 'text-gray-400'
                }`}
              >
                {isValid ? 'Join the Conversation →' : 'Enter Username First'}
              </Text>
            </TouchableOpacity>

            {/* Privacy Note */}
            <Text className="text-gray-500 text-center text-xs mt-6 leading-relaxed">
              Your username is visible to all chat participants{'\n'}
              <Text className="text-gray-600">
                You can change it anytime by rejoining
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
