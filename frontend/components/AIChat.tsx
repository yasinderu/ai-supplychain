"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { askQuestion } from "@/actions/ai.action";
import { saveMessageToAIChat } from "@/actions/ai.action";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface AIChatUIProps {
  onSendMessage?: (message: string) => void;
  initialMessages: Message[];
  isOnline?: boolean;
  supportTitle?: string;
  className?: string;
  userId: string;
}

const AIChatUI: React.FC<AIChatUIProps> = ({
  onSendMessage,
  initialMessages,
  userId,
  isOnline = true,
  supportTitle = "Chat Support",
  className = "",
}) => {
  const firstMessage: Message[] = [
    {
      id: 1,
      text: "Hello, I'm Kenny your AI Assistant! How can I help you today?",
      sender: "bot",
    },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(firstMessage);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prevMessages) => prevMessages.concat(initialMessages));
  }, []);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (inputText.trim()) {
      const userMsgPayload = {
        user_id: userId,
        sender: "user",
        text: inputText,
      };
      const savedMessage = await saveMessageToAIChat(userMsgPayload);

      if (savedMessage) {
        const newMessage: Message = {
          id: savedMessage.id,
          text: inputText,
          sender: "user",
          // timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputText("");
      }

      if (onSendMessage) {
        onSendMessage(inputText);
      } else {
        const payload = {
          question: inputText,
        };
        try {
          setIsTyping(true);
          const data = await askQuestion(payload);

          const botMsgPayload = {
            sender: "bot",
            user_id: userId,
            text: data.answer,
          };

          const message = await saveMessageToAIChat(botMsgPayload);

          if (data) {
            setIsTyping(false);
            const newMessage: Message = {
              id: message.id,
              text: data.answer,
              sender: "bot",
              // timestamp: new Date(),
            };
            setMessages((prev) => [...prev, newMessage]);
          }
        } catch (error) {
          console.log(error);
          setIsTyping(false);
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const toggleOpen = (): void => {
    setIsOpen(true);
  };

  const toggleClose = (): void => {
    setIsOpen(false);
  };

  const toggleMinimize = (): void => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <button
          onClick={toggleOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div
        className={`bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
          isMinimized ? "h-14 w-80" : "h-96 w-80"
        }`}
      >
        <div className="bg-gradient-to-r from-gray-800 to-slate-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{supportTitle}</h3>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs opacity-90">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize}
              className="hover:bg-white/10 p-1 rounded transition-colors"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={toggleClose}
              className="hover:bg-white/10 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message: Message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gray-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-sm border"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {/* {formatTime(message.timestamp)} */}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-sm border px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatUI;
