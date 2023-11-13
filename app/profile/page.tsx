import AuthButton from "@/components/AuthButton"

export default function Profile() {
  return (
  <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    <h1>Profile page</h1>
    <div>
      <AuthButton/>
    </div>
  </div>
  )
}