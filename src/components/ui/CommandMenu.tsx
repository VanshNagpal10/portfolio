"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { playClickTick, playConfirmChime } from "@/utils/audio";
import { useAudio } from "@/context/AudioContext";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Actions" | "Audio";
  label: string;
  sublabel?: string;
  shortcut?: string;
  icon: string;
  action: () => void;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div`
  width: 90%;
  max-width: 600px;
  background: #111318;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  animation: scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  @keyframes scaleUp {
    from {
      transform: scale(0.96) translateY(-8px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  svg {
    color: #64748b;
    flex-shrink: 0;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  font-size: 15px;
  color: #ffffff;
  padding: 0;

  &::placeholder {
    color: #64748b;
  }
`;

const EscPill = styled.kbd`
  padding: 2px 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: #94a3b8;
`;

const ItemList = styled.div`
  max-height: 340px;
  overflow-y: auto;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

const CategoryHeader = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  padding: 8px 12px 4px;
`;

const ItemRow = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ $isSelected }) =>
    $isSelected ? "rgba(56, 142, 233, 0.18)" : "transparent"};
  border: 1px solid
    ${({ $isSelected }) =>
      $isSelected ? "rgba(56, 142, 233, 0.4)" : "transparent"};
  color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#cbd5e1")};
  cursor: pointer;
  text-align: left;
  transition: all 0.1s ease;

  &:hover {
    background: rgba(56, 142, 233, 0.14);
    color: #ffffff;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemLabel = styled.span`
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.3;
`;

const ItemSublabel = styled.span`
  font-size: 11px;
  color: #64748b;
`;

const ItemShortcut = styled.span`
  font-family: ui-monospace, monospace;
  font-size: 11px;
  color: #64748b;
`;

const FooterGuide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  font-family: ui-monospace, monospace;
  font-size: 10.5px;
  color: #64748b;
`;

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const { togglePlay, isPlaying } = useAudio();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    {
      id: "projects",
      category: "Navigation",
      label: "Projects & Builds",
      sublabel: "6 Interactive CDs (Ping, KWIK, RIMO, CodeGenie)",
      shortcut: "G P",
      icon: "💿",
      action: () => {
        playClickTick();
        onClose();
        router.push("/projects");
      },
    },
    {
      id: "experience",
      category: "Navigation",
      label: "Experience & Roles",
      sublabel: "Software Developer at KhwaaishAI & DDITLAB",
      shortcut: "G E",
      icon: "💼",
      action: () => {
        playClickTick();
        onClose();
        router.push("/experience");
      },
    },
    {
      id: "honors",
      category: "Navigation",
      label: "Honors & Achievements",
      sublabel: "Apple Swift Student Challenge '26 & 9× Podiums",
      shortcut: "G H",
      icon: "🏆",
      action: () => {
        playClickTick();
        onClose();
        router.push("/honors");
      },
    },
    {
      id: "about",
      category: "Navigation",
      label: "About & Engineering Philosophy",
      sublabel: "Native iOS, full-stack craft, leadership at GDG & VIPS",
      shortcut: "G A",
      icon: "👤",
      action: () => {
        playClickTick();
        onClose();
        router.push("/about");
      },
    },
    {
      id: "contact",
      category: "Navigation",
      label: "Contact & Engraved Backplate",
      sublabel: "Let's build something tactile together",
      shortcut: "G C",
      icon: "✉",
      action: () => {
        playClickTick();
        onClose();
        router.push("/contact");
      },
    },
    {
      id: "resume",
      category: "Actions",
      label: "Download Resume PDF",
      sublabel: "Official SDE resume (Vansh-SDE.pdf)",
      shortcut: "⌘ R",
      icon: "📄",
      action: () => {
        playConfirmChime();
        onClose();
        window.open("/Vansh-SDE.pdf", "_blank");
      },
    },
    {
      id: "copy-email",
      category: "Actions",
      label: "Copy Email Address",
      sublabel: "vanshnagpal21@gmail.com",
      shortcut: "⌘ C",
      icon: "📋",
      action: () => {
        playConfirmChime();
        navigator.clipboard.writeText("vanshnagpal21@gmail.com");
        onClose();
      },
    },
    {
      id: "toggle-music",
      category: "Audio",
      label: isPlaying ? "Pause Lo-Fi Soundtrack" : "Play Lo-Fi Soundtrack",
      sublabel: "Curated ambient study track for coding",
      shortcut: "Space",
      icon: "♪",
      action: () => {
        playClickTick();
        togglePlay();
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.sublabel?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
        playClickTick();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
        playClickTick();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <SearchBar>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <SearchInput
            ref={inputRef}
            placeholder="Type a section or action (e.g. Projects, Resume, Audio)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <EscPill>ESC</EscPill>
        </SearchBar>

        <ItemList>
          {filteredItems.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {index === 0 || item.category !== filteredItems[index - 1].category ? (
                  <CategoryHeader>{item.category}</CategoryHeader>
                ) : null}
                <ItemRow
                  $isSelected={index === selectedIndex}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <ItemLeft>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemInfo>
                      <ItemLabel>{item.label}</ItemLabel>
                      {item.sublabel && <ItemSublabel>{item.sublabel}</ItemSublabel>}
                    </ItemInfo>
                  </ItemLeft>
                  {item.shortcut && <ItemShortcut>{item.shortcut}</ItemShortcut>}
                </ItemRow>
              </React.Fragment>
            ))
          )}
        </ItemList>

        <FooterGuide>
          <span>Use ↑ ↓ to navigate</span>
          <span>↵ to execute</span>
          <span>ESC to dismiss</span>
        </FooterGuide>
      </Dialog>
    </Backdrop>
  );
}
