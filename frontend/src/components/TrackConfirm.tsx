import { useState } from "react";

type Props = {
  selectedTrack: any;
  onConfirm: () => void;
};

export default function TrackConfirm({ selectedTrack, onConfirm }: Props) {
  const token = localStorage.getItem("token");
  const [memo, setMemo] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleConfirm = async () => {
    try {
      await fetch("http://localhost:3000/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          spotifyId: selectedTrack.id,
          title: selectedTrack.name,
          artist: selectedTrack.artists?.[0]?.name ?? "",
          imageUrl: selectedTrack.album?.images?.[0]?.url ?? "",
          spotifyUrl: selectedTrack.external_urls?.spotify ?? "",
          albumName: selectedTrack.album?.name ?? "",
          memo,
          tags,
        }),
      });
      onConfirm();
    } catch (error) {
      console.error("Error posting music:", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <textarea
        className="w-full mt-2 p-2 border rounded"
        placeholder="メモ（自由記入）"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      <div className="mt-2">
        <input
          className="border p-1 rounded mr-2"
          placeholder="タグを入力してEnter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tagInput.trim() !== "") {
              e.preventDefault();
              setTags([...tags, tagInput.trim()]);
              setTagInput("");
            }
          }}
        />
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <button
        className="bg-pink-200 px-4 py-1 rounded-md hover:bg-pink-300"
        onClick={handleConfirm}
      >
        これ聴いてみて！
      </button>
      <a
        href={selectedTrack.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 underline"
      >
        🎵 Spotifyで開く
      </a>
    </div>
  );
}
