import { Message } from '../types/types';

export const isSystemMessage = (message: Message): boolean => {
  return message.username === 'System';
};

export const isOwnMessage = (
  message: Message,
  currentUsername: string,
): boolean => {
  return message.username === currentUsername && !isSystemMessage(message);
};

export const validateMessage = (text: string): boolean => {
  return text.trim().length > 0 && text.trim().length <= 1000;
};

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 2 && username.trim().length <= 30;
};
