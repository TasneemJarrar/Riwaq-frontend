import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import {
  useConversations,
  useMessages,
  useSendMessage,
} from "../../hooks/useConversations";
import type {
  ConversationResponse,
  MessageResponse,
  PublicUserProfileResponse,
} from "../../api/conversations";

function displayName(user: PublicUserProfileResponse | null | undefined): string {
  if (!user) return "Unknown";
  const first = user.firstName?.trim() ?? "";
  const last = user.lastName?.trim() ?? "";
  const full = `${first} ${last}`.trim();
  return full || "User";
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getOtherParticipant(
  conversation: ConversationResponse,
  currentUserId: string | undefined
): PublicUserProfileResponse | null {
  if (!conversation.participants?.length) return null;
  return (
    conversation.participants.find((p) => p.userId !== currentUserId) ??
    conversation.participants[0]
  );
}

export default function ChatPage() {
  const currentUser = useAuthStore((s) => s.user);
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get("userId");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations = [], isLoading: loadingConversations } =
    useConversations();

  // Derive effective selected conversation
  const effectiveSelectedId = useMemo(() => {
    if (selectedId) return selectedId;

    // Prefer conversation with the user from ?userId=
    if (targetUserId && conversations.length > 0) {
      const match = conversations.find((c) =>
        c.participants?.some((p) => p.userId === targetUserId)
      );
      if (match) return match.id;
    }

    if (conversations.length > 0) return conversations[0].id;
    return null;
  }, [selectedId, conversations, targetUserId]);

  const { data: messages = [], isLoading: loadingMessages } =
    useMessages(effectiveSelectedId);

  const sendMessage = useSendMessage(effectiveSelectedId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedConversation = conversations.find(
    (c) => c.id === effectiveSelectedId
  );
  const otherUser = selectedConversation
    ? getOtherParticipant(selectedConversation, currentUser?.userId)
    : null;

  const handleSend = async () => {
    const text = messageText.trim();
    if (!text || !effectiveSelectedId || sendMessage.isPending) return;

    try {
      await sendMessage.mutateAsync({ content: text });
      setMessageText("");
    } catch {
      // error handled by react-query
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-background text-text-primary">
      {/* ===== Left Sidebar – Conversations ===== */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-surface-1 sm:w-80">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-text">
            {conversations.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConversations && (
            <div className="flex items-center justify-center py-12 text-text-secondary">
              Loading conversations…
            </div>
          )}

          {!loadingConversations && conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center text-text-secondary">
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs text-text-tertiary">
                Connect with someone to start chatting
              </p>
            </div>
          )}

          {conversations.map((conv) => {
            const other = getOtherParticipant(conv, currentUser?.userId);
            const isSelected = conv.id === effectiveSelectedId;

            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedId(conv.id)}
                className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface-hover ${
                  isSelected ? "bg-primary-soft/60" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-text">
                  {displayName(other).charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">
                      {displayName(other)}
                    </span>
                    <span className="shrink-0 text-xs text-text-tertiary">
                      {formatRelativeTime(conv.lastActivityAt)}
                    </span>
                  </div>

                  {conv.subject && (
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {conv.subject}
                    </p>
                  )}

                  {other?.learningDirectionName && (
                    <p className="mt-0.5 truncate text-xs text-text-tertiary">
                      {other.learningDirectionName}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ===== Main Chat Area ===== */}
      <section className="flex flex-1 flex-col bg-background">
        {!effectiveSelectedId || !selectedConversation ? (
          <div className="flex flex-1 items-center justify-center text-text-secondary">
            Select a conversation to start chatting
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-border bg-surface-1 px-4 py-3 sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-text">
                {displayName(otherUser).charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">
                  {displayName(otherUser)}
                </h3>
                {selectedConversation.subject && (
                  <p className="truncate text-sm text-text-secondary">
                    {selectedConversation.subject}
                  </p>
                )}
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {loadingMessages && (
                <div className="flex justify-center py-8 text-text-secondary">
                  Loading messages…
                </div>
              )}

              {!loadingMessages && messages.length === 0 && (
                <div className="flex justify-center py-12 text-sm text-text-tertiary">
                  No messages yet. Say hello!
                </div>
              )}

              <div className="mx-auto flex max-w-3xl flex-col gap-3">
                {messages.map((msg: MessageResponse) => {
                  const isMine = msg.sender.userId === currentUser?.userId;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isMine
                            ? "rounded-br-md bg-primary text-white"
                            : "rounded-bl-md bg-surface-2 text-text-primary"
                        }`}
                      >
                        {!isMine && (
                          <p className="mb-1 text-xs font-medium opacity-70">
                            {displayName(msg.sender)}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                        <p
                          className={`mt-1 text-[10px] ${
                            isMine ? "text-white/70" : "text-text-tertiary"
                          }`}
                        >
                          {formatMessageTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-border bg-surface-1 px-4 py-3 sm:px-6">
              <div className="mx-auto flex max-w-3xl items-end gap-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  rows={1}
                  className="max-h-32 min-h-[42px] flex-1 resize-none rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus-soft"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!messageText.trim() || sendMessage.isPending}
                  className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sendMessage.isPending ? "…" : "Send"}
                </button>
              </div>
              {sendMessage.isError && (
                <p className="mx-auto mt-2 max-w-3xl text-xs text-error">
                  Failed to send message. Please try again.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}