export const metadata = {
  title: "ProllyYes News"
}

export default function Page() {
  return <>
    <main className="p-8 gap-4 flex flex-col">
      <h1>News</h1>
      {
        news.map(item => <div className='flex flex-col gap-2' key={item.time}>
          <h3>{item.heading}</h3>
          <i className="text-sm">{item.time}</i>
          <p>{item.content}</p>
        </div>)
      }
    </main>
  </>
}

const news = [
  {
    heading: 'V1.0',
    time: '2024-01-14',
    content: 'ProllyYes is out officially! Enjoy this free online probability distribution calculator / visualizer.'
  },
  {
    heading: 'V0.1',
    time: '2024-01-11',
    content: 'Beta version.'
  }
]
