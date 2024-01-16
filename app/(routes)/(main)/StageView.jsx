export default function StageView({ title, loading, children }) {
  return <div>
    <h2>{title} {loading && <i>- Loading</i>}</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-8 flex gap-7 flex-col xl:flex-row border mt-1.5 justify-between">
      {children}
    </div>
  </div>

}