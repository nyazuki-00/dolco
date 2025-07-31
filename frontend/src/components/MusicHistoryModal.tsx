import React from "react";
import type { Music } from "@/types/music";

type Props = {
  musicHistory: Music[];
  onClose: () => void;
};

export default function MusicHistoryModal({ musicHistory, onClose }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 p-4 overflow-y-auto z-50">
      <button
        className="mb-4 text-sm underline text-pink-500"
        onClick={onClose}
      >
        とじる
      </button>
      <h2 className="text-lg font-bold mb-2">今まで教えてくれた音楽</h2>
      <ul className="space-y-2">
        {musicHistory.length > 0 ? (
          musicHistory.map((music, index) => (
            <li key={index}>
              ・{music.title} / {music.artist}
            </li>
          ))
        ) : (
          <li>まだ音楽が登録されていません</li>
        )}
      </ul>
    </div>
  );
}
