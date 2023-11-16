export default async function Index() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke")
  const data = await res.json()
  const setup = data.setup
  const punchline = data.punchline

  return (
    <div className="flex flex-col items-center">
      <pre>{setup}</pre>
      <pre>{punchline}</pre>
    </div>
  )
}
