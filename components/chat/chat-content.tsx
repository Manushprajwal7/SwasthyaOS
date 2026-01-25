"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Phone, Video, MoreVertical, Plus, Bot } from "lucide-react";
import { AIChatInterface } from "./ai-chat-interface";

export function ChatContent() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Priya Sharma",
      isOwn: false,
      text: "Patient vitals look concerning. Has any medication been started?",
      time: "2:15 PM",
    },
    {
      id: 2,
      sender: "You",
      isOwn: true,
      text: "Paracetamol 500mg was given at 2:00 PM. Currently monitoring vital signs every 15 minutes.",
      time: "2:16 PM",
    },
    {
      id: 3,
      sender: "Dr. Priya Sharma",
      isOwn: false,
      text: "Good. Also start IV fluids as per protocol. I'll be available if emergency intervention needed.",
      time: "2:17 PM",
    },
    {
      id: 4,
      sender: "You",
      isOwn: true,
      text: "Understood. IV started. Patient responding well to treatment.",
      time: "2:18 PM",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      status: "Online",
      avatar: "PS",
      lastMessage: "Patient responding well...",
      unread: 0,
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      status: "Online",
      avatar: "RK",
      lastMessage: "When can you transfer the patient?",
      unread: 2,
    },
    {
      id: 3,
      name: "Asha - Frontline Worker",
      status: "Away",
      avatar: "AW",
      lastMessage: "Got the medication",
      unread: 0,
    },
    {
      id: 4,
      name: "Emergency Dispatch",
      status: "Online",
      avatar: "ED",
      lastMessage: "Ambulance will arrive in 5 mins",
      unread: 1,
    },
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          isOwn: true,
          text: inputText,
          time: "Now",
        },
      ]);
      setInputText("");
    }
  };

  const selectedConversation = conversations.find((c) => c.id === selectedChat);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Remote Consultation Chat
        </h1>
        <p className="text-muted-foreground">
          Real-time communication with healthcare professionals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Chats</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Online Colleagues</p>
            <p className="text-2xl font-bold text-success">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-bold">2.1m</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Unread Messages</p>
            <p className="text-2xl font-bold text-warning">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface with AI Tab */}
      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="team">Team Chat</TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-4">
          <div className="grid gap-4 md:grid-cols-4 h-[600px]">
            {/* Conversations List */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Conversations</CardTitle>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto h-[480px]">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedChat === conv.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{conv.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conv.status === "Online" ? (
                            <span className="text-success">● Online</span>
                          ) : (
                            <span>● Away</span>
                          )}
                        </p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="bg-error text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="md:col-span-3">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {selectedConversation?.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {selectedConversation?.status === "Online" ? (
                        <span className="text-success">● Online</span>
                      ) : (
                        <span>● Away</span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-4 space-y-3 overflow-y-auto h-[420px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isOwn
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 px-3 py-2 border rounded-lg outline-none focus:border-primary"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-primary hover:bg-primary-light gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Consult timing: Log all clinical decisions for audit trail
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <AIChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
}
