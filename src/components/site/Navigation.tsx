import React from "react";

const Navigation = ({ items }: { items: string[] }) => {
    return (
        <div className="absolute bg-black shadow-md p-4 top-full mt-2 z-10 bg-opacity-70">
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="block text-white hover:text-[#E99C28] transition-colors"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation