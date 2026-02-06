"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Markets",
    description: "Prices & market data",
    href: "/markets",
    icon: ChartPieIcon,
  },
  {
    name: "Spot",
    description: "Buy & sell crypto",
    href: "/binance",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Futures",
    description: "Trade with leverage",
    href: "/futures",
    icon: ArrowPathIcon,
  },
  {
    name: "Earn",
    description: "Grow your assets",
    href: "/earn",
    icon: SquaresPlusIcon,
  },
  {
    name: "Wallet",
    description: "Deposit & withdraw",
    href: "/wallet",
    icon: FingerPrintIcon,
  },
];

const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  // router
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0e11]/80 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex flex-1">
          <img
            src="/DmtbinancelogowithoutBG.png"
            alt="Logo"
            className="h-11 w-auto cursor-pointer transition hover:scale-105"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-300 hover:text-amber-400 transition"
          >
            <Bars3Icon className="size-7" />
          </button>
        </div>

        {/* Desktop menu */}
        <PopoverGroup className="hidden lg:flex gap-x-10">
          {/* Product dropdown */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-1 text-sm font-semibold text-gray-300 hover:text-[#F0B90B] transition">
              Trade
              <ChevronDownIcon className="size-4" />
            </PopoverButton>

            <PopoverPanel className="absolute left-1/2 mt-4 w-screen max-w-md -translate-x-1/2 rounded-2xl bg-[#111827] shadow-xl ring-1 ring-white/10">
              <div className="p-4 space-y-1">
                {products.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition"
                  >
                    <item.icon className="size-5 text-[#F0B90B]" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/10 bg-white/5">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-amber-400 hover:bg-white/10 transition"
                  >
                    <item.icon className="size-5" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {["Buy Crypto", "Markets", "Earn"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-semibold text-gray-300 hover:text-amber-400 transition"
            >
              {link}
            </a>
          ))}
        </PopoverGroup>

        {/* Right side */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Log In
          </a>

          <a
            href="#"
            className="
      rounded-sm
      bg-[#F0B90B]
      px-4 py-2
      text-sm font-semibold text-black
      hover:bg-[#f8cf4d]
      transition
    "
          >
            Register
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden z-20"
      >
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0b0e11] p-6 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <img src="/DmtbinancelogowithoutBG.png" className="h-9" />
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="size-6 text-red-400" />
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <Disclosure>
              <DisclosureButton className="flex w-full justify-between rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10">
                Trade
                <ChevronDownIcon className="size-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 space-y-2">
                {[...products, ...callsToAction].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:text-amber-400 hover:bg-white/10"
                  >
                    {item.name}
                  </a>
                ))}
              </DisclosurePanel>
            </Disclosure>

            {["Home", "Marketplace", "Company"].map((item) => (
              <a
                key={item}
                href="/ "
                className="block rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-amber-400"
              >
                {item}
              </a>
            ))}

            <a
              href="#"
              className="block rounded-lg bg-amber-400 px-3 py-2 text-center font-semibold text-black"
            >
              Get Started
            </a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
