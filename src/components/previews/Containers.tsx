import ShareReport from "../ShareReport";

export function PreviewContainer({ children }): JSX.Element {
  return <>
  <main className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
    {children}
  </main>
  <div className="flex flex-col items-center w-full mt-6"><ShareReport /></div>
  </>
}
