import { NavLink } from "react-router-dom";
import { Home, PlusCircle, LayoutGrid, User } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/new-product", label: "New Product", icon: PlusCircle },
  { to: "/catalog", label: "Catalog", icon: LayoutGrid },
  { to: "/profile", label: "Profile", icon: User },
];

/**
 * BottomNav
 * ----------------------------------------------------------------------
 * Positioned absolutely within AppShell's frame, so it sits correctly
 * whether that frame is a full mobile screen or the desktop phone-card.
 *
 * Design choices for a low-literacy, first-time smartphone audience:
 * - Icon + short label together (never icon-only, never color-only state)
 * - Large tap targets (64px+ tall) spaced apart to avoid mis-taps
 * - Active tab gets a solid fill, not just a color/weight change
 */
export default function BottomNav() {
  return (
    <nav
      className="absolute bottom-0 inset-x-0 z-30 bg-cotton border-t border-ink/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Primary"
    >
      <ul className="flex items-stretch justify-between px-1.5">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-1 min-h-[64px] py-2.5 mx-1 my-1.5 rounded-2xl transition-colors",
                  isActive ? "bg-indigo text-cotton" : "text-ink/55 active:bg-ink/5",
                ].join(" ")
              }
            >
              <Icon size={24} strokeWidth={2.25} aria-hidden="true" />
              <span className="text-[11px] font-semibold font-sans leading-none text-center">
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
