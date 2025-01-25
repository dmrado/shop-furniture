import Link from 'next/link'

type Props = {
    items: []
    closeMenu: () => void
}

const Navigation = ({items, closeMenu}:  Props ) => {
    return (
        <div className="absolute bg-black shadow-md p-4 top-full mt-2 z-10 bg-opacity-70">
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            href="#"
                            onClick={closeMenu}
                            className="block text-white hover:text-[#E99C28] transition-colors"
                        >
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation