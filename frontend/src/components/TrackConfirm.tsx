type Props = {
  selectedTrack: any;
  onConfirm: () => void;
};

export default function TrackConfirm({ selectedTrack, onConfirm }: Props) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <button
        className="bg-pink-200 px-4 py-1 rounded-md hover:bg-pink-300"
        onClick={onConfirm}
      >
        これ聴いてみて！
      </button>
      <a
        href={selectedTrack.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 underline"
      >
        ♫ Spotifyで開く
      </a>
    </div>
  );
}
