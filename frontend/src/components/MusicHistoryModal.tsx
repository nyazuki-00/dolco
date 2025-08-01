import { useState } from "react";
import Image from "next/image";
import type { Music } from "@/types/music";

type Props = {
  musicHistory: Music[];
  onClose: () => void;
};

export default function MusicHistoryModal({ musicHistory, onClose }: Props) {
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-pink-50 bg-opacity-90 p-6 overflow-y-auto z-50">
      {/* とじるボタン */}
      <button
        className="mb-6 text-sm underline text-pink-500 float-right"
        onClick={onClose}
      >
        とじる
      </button>

      {/* メインタイトル */}
      <h2 className="text-xl font-bold text-center text-pink-700 mb-6 border border-pink-200 rounded-lg py-2 px-4 w-fit mx-auto">
        Music
      </h2>

      <div className="flex justify-center items-start mb-6 gap-4">
        {/* ドール */}
        <div className="flex flex-col items-center">
          <Image src="/doll.png" alt="doll" width={100} height={100} />
        </div>

        {/* 吹き出し */}
        <div className="bg-white shadow-lg p-4 rounded-xl w-64 z-50">
          {selectedMusic ? (
            <>
              <p className="text-sm text-gray-700">
                {selectedMusic.artist}の
                <span className="font-bold text-pink-500">
                  {selectedMusic.title}
                </span>
                だね。
              </p>
              <p className="text-sm text-gray-700 mt-1">
                オーナーが「
                {selectedMusic.memo || "..."}
                」って言ってた。
              </p>
              <p className="text-sm mt-1">この曲すき。</p>
            </>
          ) : (
            <p className="text-sm text-gray-700">
              お気に入りの曲を並べているの。<br />
              オーナーが教えてくれた。<br />
              どの曲が気になる？
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-6 items-start justify-center">
        {/* 曲一覧グリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
          {musicHistory.map((music) => (
            <div
              key={music.id}
              className="bg-white shadow-md rounded-xl w-[120px] p-2 flex flex-col items-center text-center cursor-pointer"
              onClick={() => setSelectedMusic(music)}
            >
              <div className="w-[90px] h-[90px] relative rounded overflow-hidden mb-2">
                <Image
                  src={music.imageUrl}
                  alt={`${music.title}のアルバム画像`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="text-xs text-gray-500 truncate w-full">{music.artist}</p>
              <p className="text-xs text-gray-400 truncate w-full">{music.albumName}</p>
              <p className="text-sm font-semibold text-pink-600 truncate w-full">
                {music.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
