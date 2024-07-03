import { useMovie } from '@/providers/MovieProvider';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { debounce } from 'lodash';
import { SyntheticEvent, useEffect, useMemo } from 'react';

const Navbar = (): JSX.Element => {
  const { query, setQuery, setOpenFilterPanel } = useMovie();

  const handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    setQuery(value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  return (
    <Disclosure as="nav" className=" bg-slate-950 sticky top-0 z-50" data-testid="navbar-component">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center w-full">
              <div className="flex-shrink-0 w-1/6">
                <span className="text-white font-semibold text-3xl">DaMuvis</span>
              </div>
              <div className="mx-auto w-4/6 hidden sm:block">
                <input
                  data-testid="navbar-search"
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search by title"
                  className="block w-full rounded-full outline-none border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={query}
                  onChange={debouncedResults}
                />
              </div>
              <div className="hidden sm:ml-6 sm:block  w-1/6">
                <div className="flex items-center">
                  <div
                    className="flex items-center text-gray-400 hover:text-white cursor-pointer"
                    onClick={() => setOpenFilterPanel(true)}>
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Filter options</span>
                      <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex sm:hidden w-1/6 ml-auto justify-end">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2"></div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div
                  className="flex items-center text-gray-400 hover:text-white cursor-pointer ml-auto"
                  onClick={() => setOpenFilterPanel(true)}>
                  <span>Filter options</span>
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 ml-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
