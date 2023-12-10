import InspirationalQuote from "../components/InspirationalQuote"
import MainPageForms from "@/components/MainPageForms"

export default async function Index() {

  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <InspirationalQuote />
      <MainPageForms />
    </div>
  )
}
