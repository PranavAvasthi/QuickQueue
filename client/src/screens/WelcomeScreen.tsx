import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function WelcomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Background Elements */}
      <View className="absolute -top-36 -right-36 w-72 h-72 bg-blue-500 opacity-10 rounded-full" />
      <View className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-500 opacity-10 rounded-full" />

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-8">
        {/* App Icon */}
        <View className="relative mb-12">
          <View className="w-24 h-24 bg-blue-500 rounded-3xl justify-center items-center shadow-2xl">
            <View className="w-16 h-16 bg-white opacity-90 rounded-2xl justify-center items-center">
              <Text className="text-2xl">💬</Text>
            </View>
          </View>

          {/* Glow Effect */}
          <View className="absolute inset-0 w-24 h-24 bg-blue-400 opacity-20 rounded-3xl" />
        </View>

        {/* App Name */}
        <Text className="text-5xl font-bold text-white mb-4 text-center tracking-tight">
          QuickQueue
        </Text>

        {/* Tagline */}
        <Text className="text-xl text-blue-300 mb-12 text-center font-medium">
          Real-time conversations, instantly
        </Text>

        {/* Features List */}
        <View className="w-full mb-16">
          <View className="flex-row items-center bg-gray-800 p-4 rounded-2xl border border-gray-700 mb-4">
            <View className="w-10 h-10 bg-green-500 rounded-xl justify-center items-center mr-4">
              <Text className="text-green-400 text-lg">⚡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">
                Lightning Fast
              </Text>
              <Text className="text-gray-400 text-sm">
                Real-time messaging with zero lag
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-gray-800 p-4 rounded-2xl border border-gray-700 mb-4">
            <View className="w-10 h-10 bg-blue-500 rounded-xl justify-center items-center mr-4">
              <Text className="text-blue-400 text-lg">🔒</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">
                Simple & Secure
              </Text>
              <Text className="text-gray-400 text-sm">
                No registration required, just pick a name
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-gray-800 p-4 rounded-2xl border border-gray-700">
            <View className="w-10 h-10 bg-purple-500 rounded-xl justify-center items-center mr-4">
              <Text className="text-purple-400 text-lg">🌐</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">
                Global Community
              </Text>
              <Text className="text-gray-400 text-sm">
                Connect with people worldwide
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="px-8 pb-12">
        {/* Get Started Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('username')}
          className="bg-blue-500 rounded-2xl py-5 px-8 shadow-2xl"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-lg font-bold tracking-wide">
            Get Started →
          </Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text className="text-gray-500 text-center text-sm mt-6 leading-relaxed">
          Join thousands of users in real-time conversations{'\n'}
          <Text className="text-gray-400">
            No account needed • Start chatting in seconds
          </Text>
        </Text>
      </View>
    </View>
  );
}
