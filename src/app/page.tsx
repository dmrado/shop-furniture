import MainPage from "@/components/site/MainPage"
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession()
    console.log('session MainPage', session)
  return (
    <div className="">
      <MainPage/>
    </div>
  )
}
