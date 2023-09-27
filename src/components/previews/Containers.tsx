import Share from "../Share";

export function PreviewContainer({ children }): JSX.Element {
  return <>
  <main className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white relative">
        <div className="absolute top-4 right-4"><Share /></div>
    {children}
  </main>
  </>
}
