import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Link, Phone, MapPin } from "lucide-react";
import cardFrontImage from "figma:asset/a0b40e71148bf595a49c51cac96a3eb9d43d110f.png";

const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1771814574174-a14fc981658d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBwdXJwbGUlMjBncmFkaWVudCUyMHdhbGxwYXBlcnxlbnwxfHx8fDE3NzIxODUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// NFC icon component (redesigned from reference)
function NFCIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 10.5a4.5 4.5 0 0 1 0 3"
        stroke="#7B7FE8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M10 8a7.5 7.5 0 0 1 0 8"
        stroke="#8B8FEE"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M13 5.5a10.5 10.5 0 0 1 0 13"
        stroke="#A5A8F4"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16 3a13.5 13.5 0 0 1 0 18"
        stroke="#C2C4F8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// SVG App Icon components for a clean, branded look
function AppIcon({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient: string;
}) {
  return (
    <div
      className={`w-[50px] h-[50px] rounded-[12px] flex items-center justify-center ${gradient}`}
    >
      {children}
    </div>
  );
}

// Custom SVG icons for each app
const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const SafariIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const MessageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const CameraIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MusicIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);
const PhotosIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const MapIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const NotesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ContactsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const WalletIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const WeatherIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
const FilesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const NFCAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 10a5 5 0 0 1 0 4"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M9.5 7.5a8.5 8.5 0 0 1 0 9"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M13 5a12 12 0 0 1 0 14"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M16.5 2.5a15.5 15.5 0 0 1 0 19"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// App grid data with branded gradients
const apps: {
  name: string;
  gradient: string;
  Icon: React.FC;
}[] = [
  {
    name: "Contacts",
    gradient: "bg-gradient-to-br from-gray-400 to-gray-600",
    Icon: ContactsIcon,
  },
  {
    name: "Safari",
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    Icon: SafariIcon,
  },
  {
    name: "Mail",
    gradient: "bg-gradient-to-br from-sky-400 to-blue-500",
    Icon: MailIcon,
  },
  {
    name: "Music",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    Icon: MusicIcon,
  },
  {
    name: "Photos",
    gradient:
      "bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500",
    Icon: PhotosIcon,
  },
  {
    name: "Camera",
    gradient: "bg-gradient-to-br from-gray-600 to-gray-800",
    Icon: CameraIcon,
  },
  {
    name: "Maps",
    gradient: "bg-gradient-to-br from-emerald-400 to-green-600",
    Icon: MapIcon,
  },
  {
    name: "Calendar",
    gradient: "bg-gradient-to-br from-red-400 to-red-600",
    Icon: CalendarIcon,
  },
  {
    name: "Notes",
    gradient: "bg-gradient-to-br from-yellow-400 to-amber-500",
    Icon: NotesIcon,
  },
  {
    name: "Clock",
    gradient: "bg-gradient-to-br from-gray-800 to-gray-950",
    Icon: ClockIcon,
  },
  {
    name: "Weather",
    gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    Icon: WeatherIcon,
  },
  {
    name: "Settings",
    gradient: "bg-gradient-to-br from-gray-400 to-gray-600",
    Icon: SettingsIcon,
  },
  {
    name: "Files",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    Icon: FilesIcon,
  },
  {
    name: "Wallet",
    gradient: "bg-gradient-to-br from-gray-900 to-black",
    Icon: WalletIcon,
  },
  {
    name: "Messages",
    gradient: "bg-gradient-to-br from-green-400 to-green-600",
    Icon: MessageIcon,
  },
  {
    name: "Phone",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    Icon: PhoneIcon,
  },
];

const dockApps: {
  name: string;
  gradient: string;
  Icon: React.FC;
}[] = [
  {
    name: "Phone",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    Icon: PhoneIcon,
  },
  {
    name: "Safari",
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    Icon: SafariIcon,
  },
  {
    name: "Messages",
    gradient: "bg-gradient-to-br from-green-400 to-green-600",
    Icon: MessageIcon,
  },
  {
    name: "Music",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    Icon: MusicIcon,
  },
];

export function NFCAnimation() {
  const [phase, setPhase] = useState<
    "idle" | "tapping" | "notification" | "revealed"
  >("idle");
  const [showNotification, setShowNotification] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleTap = () => {
    if (phase !== "idle") return;
    setPhase("tapping");
    setTimeout(() => {
      setPhase("notification");
      setShowNotification(true);
    }, 600);
    setTimeout(() => setShowNotification(false), 2400);
    setTimeout(() => setPhase("revealed"), 3000);
  };

  const handleReset = () => {
    setPhase("idle");
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-100/50 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[100px]" />
      </div>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Phone Mockup */}
      <div
        className="relative z-10"
        style={{
          transform: isMobile ? "scale(0.75)" : "scale(1)",
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-[300px] h-[600px] rounded-[48px] border-[6px] border-gray-900 bg-black shadow-2xl overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-30" />

          {/* Phone Screen Content */}
          <div className="w-full h-full relative">
            {/* Dark wallpaper with brand colors */}
            <div className="absolute inset-0">
              <img
                src={WALLPAPER_URL}
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* Status bar */}
            <div className="relative z-20 flex items-center justify-between px-8 pt-[14px]">
              <span className="text-[11px] text-white/80">
                9:41
              </span>
              <div className="flex items-center gap-1">
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="currentColor"
                  className="text-white/80"
                >
                  <rect
                    x="0"
                    y="6"
                    width="2.5"
                    height="4"
                    rx="0.5"
                  />
                  <rect
                    x="3.5"
                    y="4"
                    width="2.5"
                    height="6"
                    rx="0.5"
                  />
                  <rect
                    x="7"
                    y="2"
                    width="2.5"
                    height="8"
                    rx="0.5"
                  />
                  <rect
                    x="10.5"
                    y="0"
                    width="2.5"
                    height="10"
                    rx="0.5"
                  />
                </svg>
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  className="text-white/80"
                >
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <rect
                    x="1.5"
                    y="1.5"
                    width="10"
                    height="7"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="17"
                    y="3"
                    width="2"
                    height="4"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* App Grid */}
            <div className="relative z-10 px-5 mt-6">
              <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                {apps.map((app, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1"
                  >
                    <AppIcon gradient={app.gradient}>
                      <app.Icon />
                    </AppIcon>
                    <span className="text-[9px] text-white/70 truncate w-full text-center">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              {/* Page dots */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <div className="w-1 h-1 rounded-full bg-white/25" />
                <div className="w-1 h-1 rounded-full bg-white/25" />
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-[22px] px-4 py-2.5 flex items-center justify-around border border-white/10">
                {dockApps.map((app, i) => (
                  <AppIcon key={i} gradient={app.gradient}>
                    <app.Icon />
                  </AppIcon>
                ))}
              </div>
            </div>

            {/* Tapping flash overlay */}
            <AnimatePresence>
              {phase === "tapping" && (
                <motion.div
                  className="absolute inset-0 z-40 bg-violet-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {/* Notification Banner */}
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  className="absolute top-[42px] left-3 right-3 z-50"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <div className="bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[20px] px-4 py-3 shadow-lg shadow-black/30 flex items-center gap-3 border border-white/10">
                    {/* NFC Icon */}
                    <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
                      <NFCIcon size={20} />
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-white text-[13px]"
                        style={{ fontWeight: 600 }}
                      >
                        Website NFC Tag
                      </p>
                      <p className="text-white/50 text-[12px] truncate">
                        Open tapmeonce.com via Safari
                      </p>
                    </div>
                    {/* Time */}
                    <span className="text-white/30 text-[11px] flex-shrink-0">
                      now
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Revealed State - Contact Details overlay */}
            <AnimatePresence>
              {phase === "revealed" && (
                <motion.div
                  className="absolute inset-0 z-40 flex flex-col items-center pt-[100px] px-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Blurred dark background */}
                  <div className="absolute inset-0 bg-[#0a0a12]/85 backdrop-blur-xl" />

                  <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Profile Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center mb-4 shadow-lg shadow-violet-900/40"
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <User className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Name */}
                    <motion.h2
                      className="text-white text-[20px]"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Alex Sterling
                    </motion.h2>

                    {/* Title */}
                    <motion.p
                      className="text-violet-400 text-[12px] tracking-[0.15em] uppercase mb-6"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Senior Architect
                    </motion.p>

                    {/* Contact Items */}
                    <div className="w-full space-y-2">
                      {[
                        {
                          icon: Mail,
                          label: "alex@tapmeonce.com",
                          delay: 0.4,
                        },
                        {
                          icon: Phone,
                          label: "+1 (555) 234-5678",
                          delay: 0.5,
                        },
                        {
                          icon: Link,
                          label: "tapmeonce.com",
                          delay: 0.6,
                        },
                        {
                          icon: MapPin,
                          label: "San Francisco, CA",
                          delay: 0.7,
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: item.delay,
                            type: "spring",
                            stiffness: 150,
                          }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-indigo-700/30 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-violet-400" />
                          </div>
                          <span className="text-white/80 text-[13px]">
                            {item.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Save Contact Button */}
                    <motion.button
                      className="mt-4 w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full text-[15px] shadow-lg shadow-violet-900/40"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8,
                        type: "spring",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                    >
                      Save Contact
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* NFC Card */}
      <motion.div
        className="absolute z-20 cursor-pointer flex flex-col items-center"
        onClick={handleTap}
        initial={{
          x: isMobile ? 80 : 180,
          y: isMobile ? 280 : 240,
          rotate: isMobile ? 8 : 12,
        }}
        animate={
          phase === "idle"
            ? {
                x: isMobile ? 80 : 180,
                y: isMobile ? 280 : 240,
                rotate: isMobile ? 8 : 12,
                opacity: 1,
                transition: { duration: 0.5 },
              }
            : phase === "tapping"
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: isMobile ? 0.7 : 0.85,
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: isMobile ? 0.7 : 0.85,
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.3,
                    ease: "easeIn",
                  },
                }
        }
        whileHover={
          phase === "idle"
            ? { scale: 1.05, rotate: isMobile ? 4 : 8 }
            : {}
        }
      >
        {/* Card */}
        <div
          className={`${isMobile ? "w-[170px]" : "w-[220px]"} rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(99,102,241,0.25)] relative`}
        >
          <img
            src={cardFrontImage}
            alt="NFC Card Front"
            className="w-full block rounded-xl"
          />
        </div>

        {/* "Click to tap" label BELOW the card */}
        {phase === "idle" && (
          <motion.p
            className="mt-4 text-violet-700 text-[14px] tracking-widest uppercase bg-violet-50 px-6 py-2.5 rounded-full shadow-md border border-violet-200"
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to tap
          </motion.p>
        )}
      </motion.div>

      {/* Reset button */}
      <AnimatePresence>
        {phase === "revealed" && (
          <motion.button
            className="absolute bottom-8 px-6 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-gray-600 text-[14px] hover:bg-gray-200 transition-colors shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
            onClick={handleReset}
          >
            Replay Animation
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}