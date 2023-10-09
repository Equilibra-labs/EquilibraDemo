import { useState } from "react";
import { Menu, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CreateProjectForm } from "./CreateProyectForm";
import { CreatePool } from "./CreatePool";
import { PoolCard } from "./PoolCard";
import TopBar from "./Topbar";

const route = [
  {
    name: "Create proyect",
    component: [<CreateProjectForm />, "#"],
    current: true,
  },
  {
    name: "Create pool",
    component: [<CreatePool />, <PoolCard />],
    current: false,
  },
  {
    name: "Support projects",
    component: ["Support Proyects", "#"],
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [currentRoute, setCurrentRoute] = useState(route);

  const handleRoute = (index: number) => {
    const updatedRoute = route.map((item, i) => ({
      ...item,
      current: i === index,
    }));
    setCurrentRoute(updatedRoute);
  };

  return (
    <>
      <div className="min-h-full ">
        <Popover as="header" className="bg-slate-900 pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <a href="#">
                      <img
                        className="h-8 w-auto rounded-full hover:opacity-75"
                        src="/img/Equilibra.png"
                        alt="Equilibra"
                      />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    {/* Wallet and Chain */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <TopBar />
                    </Menu>
                  </div>

                  {/* Search */}
                  <div className="min-w-0 flex-1 px-12 lg:hidden">
                    <div className="mx-auto w-full max-w-xs">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden ">
                    {/* Mobile menu button */}
                    <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden border-opacity-20 py-5 lg:block relative">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex space-x-4">
                        {currentRoute.map((item, index) => (
                          <button
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "text-white bg-white/10"
                                : "text-indigo-100",
                              "rounded-md  bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => handleRoute(index)}
                          >
                            {item.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="mobile-search"
                            className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
        {/* Main Components */}
        <main className="-mt-24 pb-2 relative ">
          <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:max-w-7xl lg:px-2 py-2">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-3 lg:gap-8 shadow-lg shadow-slate-800">
              {/* Left column  */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lgshadow">
                    <div className="">
                      {/* route Component */}
                      <h1>
                        {currentRoute.map((item) => (
                          <div key={item.name}>
                            {item.current && item.component[0]}
                          </div>
                        ))}
                      </h1>
                    </div>
                  </div>
                </section>
              </div>
              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg shadow bg-slate-900 min-h-screen">
                    <div className="p-2">
                      {/* Your content */}
                      {currentRoute.map((item) => (
                        <div key={item.name}>
                          <h1></h1>
                          {item.current && item.component[1]}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="w-full relative bottom-0 ">
            <div className="py-8 text-center text-sm text-gray-400 sm:text-center">
              <span className="block sm:inline">
                &copy; 2023 EquiLabs, Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
