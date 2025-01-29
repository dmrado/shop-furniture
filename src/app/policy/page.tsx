import PersonalDataAgreement from "@/components/site/PersonalDataAgreement"
import ConfidentialPolicy from "@/components/site/ConfidentialPolicy"
import Link from "next/link"


const PagePersonalDataAgreement = () => {

    return <>
        <div className="flex flex-col px-20 py-10">
            <PersonalDataAgreement/>
            <br/>
            <br/>
            +++++++++++++++++++++++
            <br/>
            <br/>
            <ConfidentialPolicy/>
            <div className="flex flex-col items-center">
                {/*todo подставить product[id] page с которого пришли */}
                <Link href={`/products`} className="">
                    <button
                        className="w-full sm:w-60 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Назад
                    </button>
                </Link>
            </div>
        </div>
    </>
}
export default PagePersonalDataAgreement