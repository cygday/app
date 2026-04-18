'use client';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { QRCodeCanvas } from 'qrcode.react';

const USDT_ADDRESS = "DLtut1ryErBD2Tw4a2G3nJs1FCrHo69cYrCC6DzYk5Uf";
const BTC_ADDRESS = "bc1qlxvxk0nrzghhzawl3fhuxtrnqrgerza8czmatm";

type FreeVideo = {
  id: number;
  title: string;
  thumb: string;
  duration: string;
  videoUrl: string;
};

type PremiumVideo = {
  id: number;
  title: string;
  thumb: string;
  duration: string;
  videoUrl: string;
};

export default function Home() {
  const [is18, setIs18] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPremiumVideo, setSelectedPremiumVideo] = useState<PremiumVideo | null>(null);
  const [playingVideo, setPlayingVideo] = useState<FreeVideo | null>(null);
  const [playingPremiumVideo, setPlayingPremiumVideo] = useState<PremiumVideo | null>(null);

  const freeVideos: FreeVideo[] = [
    {
      id: 1,
      title: "Free Sample 1 - Teaser",
      thumb: "https://picsum.photos/id/1015/300/200",
      duration: "02:30",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      title: "Free Sample 2 - Short Clip",
      thumb: "https://picsum.photos/id/133/300/200",
      duration: "01:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      title: "Free Sample 3 - Short Clip",
      thumb: "https://picsum.photos/id/145/300/200",
      duration: "01:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 4,
      title: "Free Sample 4 - Short Clip",
      thumb: "https://picsum.photos/id/160/300/200",
      duration: "01:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
  ];

  const premiumVideos: PremiumVideo[] = [
    { id: 5, title: "Premium - Passionate Night",  thumb: "https://picsum.photos/id/201/300/200", duration: "15:20", videoUrl: "/videos/video.mp4" },
    { id: 6, title: "Premium - Wild Desire",       thumb: "https://picsum.photos/id/206/300/200", duration: "12:45", videoUrl: "/videos/vide.mp4" },
    { id: 7, title: "Premium - Secret Encounter",  thumb: "https://picsum.photos/id/180/300/200", duration: "18:10", videoUrl: "/videos/vid.mp4" },
    { id: 8, title: "Premium - Wild Desire 2",     thumb: "https://picsum.photos/id/210/300/200", duration: "12:45", videoUrl: "/videos/vi.mp4" },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleLogin = async () => {
    const email = prompt("Enter your email address:");
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) alert(error.message);
    else alert("✅ Magic link sent! Check your email.");
  };

  const openDonationModal = (video: PremiumVideo) => {
    setSelectedPremiumVideo(video);
    setShowModal(true);
  };

  const handleUnlock = () => {
    setPlayingPremiumVideo(selectedPremiumVideo);
    setShowModal(false);
  };

  if (!is18) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-10 max-w-md">
          <h1 className="text-6xl font-bold mb-6 text-red-500">🔞 XXXVault</h1>
          <p className="mb-10 text-xl">You must be 18+ to enter.</p>
          <button
            onClick={() => setIs18(true)}
            className="bg-red-600 hover:bg-red-700 px-16 py-6 rounded-2xl text-2xl font-bold"
          >
            YES, I AM 18+
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 p-5 flex justify-between items-center sticky top-0 bg-zinc-950 z-50">
        <h1 className="text-3xl font-bold text-red-500">XXXVault</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user.email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium"
          >
            Login / Register
          </button>
        )}
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Free Videos */}
        <h2 className="text-3xl font-bold mb-6 text-green-500">✅ Free Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {freeVideos.map(video => (
            <div key={video.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative">
                {playingVideo?.id === video.id ? (
                  <video controls autoPlay className="w-full aspect-video" src={video.videoUrl} />
                ) : (
                  <>
                    <img src={video.thumb} alt={video.title} className="w-full aspect-video object-cover" />
                    <button
                      onClick={() => setPlayingVideo(video)}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/40 transition"
                    >
                      <div className="bg-red-600 rounded-full p-5 text-2xl">▶️</div>
                    </button>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-xs text-green-500">Free to Watch</p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Videos */}
        <h2 className="text-3xl font-bold mb-6 text-yellow-500">🔒 Premium Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {premiumVideos.map(video => (
            <div key={video.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative">
                {playingPremiumVideo?.id === video.id ? (
                  <video controls autoPlay className="w-full aspect-video" src={video.videoUrl} />
                ) : (
                  <>
                    <img src={video.thumb} alt={video.title} className="w-full aspect-video object-cover" />
                    <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 text-xs rounded">{video.duration}</div>
                  </>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-4">{video.title}</h3>
                {playingPremiumVideo?.id === video.id ? (
                  <p className="text-center text-green-400 text-sm font-medium">🔓 Unlocked</p>
                ) : (
                  <button
                    onClick={() => openDonationModal(video)}
                    className="w-full bg-gradient-to-r from-purple-600 to-red-600 py-4 rounded-xl font-bold hover:brightness-110"
                  >
                    💰 Unlock Full Video
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Donation Modal */}
      {showModal && selectedPremiumVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold mb-1">Unlock Premium Video</h3>
            <p className="text-red-400 mb-8">{selectedPremiumVideo.title}</p>

            <p className="text-gray-400 mb-6 text-center">Send any amount you want</p>

            <div className="space-y-10">
              <div className="text-center">
                <p className="text-green-400 font-medium mb-3">USDT (TRC20) — Recommended</p>
                <div className="bg-black p-4 rounded-xl text-xs break-all mb-4 font-mono select-all">{USDT_ADDRESS}</div>
                <div className="bg-white p-4 rounded-2xl inline-block">
                  <QRCodeCanvas value={USDT_ADDRESS} size={200} />
                </div>
              </div>

              <div className="text-center">
                <p className="text-orange-400 font-medium mb-3">Bitcoin (BTC)</p>
                <div className="bg-black p-4 rounded-xl text-xs break-all mb-4 font-mono select-all">{BTC_ADDRESS}</div>
                <div className="bg-white p-4 rounded-2xl inline-block">
                  <QRCodeCanvas value={BTC_ADDRESS} size={200} />
                </div>
              </div>
            </div>

            <button
              onClick={handleUnlock}
              className="mt-6 w-full py-4 bg-green-700 hover:bg-green-600 rounded-2xl text-lg font-bold"
            >
              ✅ I Sent Payment — Watch Now
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}