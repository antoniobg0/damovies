import { SyntheticEvent, useEffect, useMemo } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMovie } from '@/providers/MovieProvider';
import { debounce } from 'lodash';

const FilterPanel = (): JSX.Element => {
  const { adult, query, openFilterPanel, setOpenFilterPanel, setQuery, setAdult } = useMovie();

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
    <Dialog className="relative z-50" open={openFilterPanel} onClose={setOpenFilterPanel}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col bg-gray-100  shadow-xl">
                <div className="sm:px-6 bg-gray-800 py-6 px-4 text-white">
                  <div className="flex items-start justify-between ">
                    <DialogTitle className="text-base font-semibold leading-6">
                      Filter options
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpenFilterPanel(false)}>
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div>
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Search by title
                    </label>
                    <div className="relative mt-2 flex items-center">
                      <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Movie title"
                        className="block w-full rounded-md border-0 py-1.5 px-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={query}
                        onChange={debouncedResults}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <fieldset className="border-b border-t border-gray-200">
                      <legend className="sr-only">Filter content type</legend>
                      <div className="divide-y divide-gray-200">
                        <div className="relative flex items-start pb-4 pt-3.5">
                          <div className="min-w-0 flex-1 text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                              Filter adult content
                            </label>
                            <p id="filter-adult" className="text-gray-500">
                              Show adult content results
                            </p>
                          </div>
                          <div className="ml-3 flex h-6 items-center">
                            <input
                              id="adult"
                              aria-describedby="filter-adult"
                              name="adult"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              defaultChecked={adult}
                              onClick={() => setAdult((prev) => !prev)}
                            />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 text-white">
                  <h4 className="text-center">DaMuvis</h4>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterPanel;
