export type RootStackParamList = {
  welcome: undefined;
  username: undefined;
  chat: { username: string };
};

export interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface User {
  username: string;
  isOnline: boolean;
}

export interface ChatHeaderProps {
  username: string;
  isConnected: boolean;
  onlineUsers: string[];
  onBackPress: () => void;
}

export interface MessageItemProps {
  message: Message;
  currentUsername: string;
}

export interface SendButtonProps {
  onPress: () => void;
  disabled: boolean;
}
