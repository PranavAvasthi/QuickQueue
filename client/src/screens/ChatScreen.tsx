import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import io, { Socket } from 'socket.io-client';
import { RootStackParamList, Message } from '../types/types';
import { validateMessage } from '../utils';
import { ChatHeader, MessageItem, SendButton } from '../components';

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'chat'
>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'chat'>;

interface Props {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
}

const SERVER_URL = 'http://localhost:5000';

export default function ChatScreen({ navigation, route }: Props) {
  const { username } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SERVER_URL, {
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      socket.emit('join', username);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Message events
    socket.on('message_history', (messageHistory: Message[]) => {
      setMessages(messageHistory);
      // Auto-scroll to bottom after loading history
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    });

    socket.on('new_message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('user_list', (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on('connect_error', error => {
      console.error('Connection error:', error);
      Alert.alert('Connection Error', 'Could not connect to chat server');
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [username]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (validateMessage(newMessage) && socketRef.current && isConnected) {
      socketRef.current.emit('message', newMessage.trim());
      setNewMessage('');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderMessage = ({ item: message }: { item: Message }) => (
    <MessageItem message={message} currentUsername={username} />
  );

  const isButtonDisabled = !validateMessage(newMessage) || !isConnected;

  return (
    <SafeAreaView className="flex-1 bg-gray-800" edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Header */}
      <ChatHeader
        username={username}
        isConnected={isConnected}
        onlineUsers={onlineUsers}
        onBackPress={handleBackPress}
      />

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        className="flex-1 bg-gray-900"
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        onLayout={() => {
          // Scroll to bottom when component first renders
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }, 50);
        }}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <SafeAreaView edges={['bottom']}>
          <View className="bg-gray-800 border-t border-gray-700 px-4 py-4">
            <View className="flex-row items-end gap-3">
              <View className="flex-1 bg-gray-700 rounded-2xl border border-gray-600 min-h-[44px] justify-center">
                <TextInput
                  value={newMessage}
                  onChangeText={setNewMessage}
                  placeholder="Type a message..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="center"
                  className="px-4 py-3 text-white text-base max-h-24"
                  style={{ fontSize: 16 }}
                  onSubmitEditing={sendMessage}
                  blurOnSubmit={false}
                />
              </View>

              <SendButton onPress={sendMessage} disabled={isButtonDisabled} />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
