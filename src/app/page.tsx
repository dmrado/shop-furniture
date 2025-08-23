import MainPage from '@/components/site/MainPage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
    const session = await getServerSession(authOptions)
    console.log('session MainPage', session)
    return (
        <div className="">
            <MainPage />
        </div>
    )
}
