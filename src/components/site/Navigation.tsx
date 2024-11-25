// import React, { useState } from 'react';
//
// export const Navigation = () => {
//     const navItem = [
//         {
//             id: 1,
//             name: 'item_1',
//             href: '#',
//         },
//         {
//             id: 2,
//             name: 'item_2',
//             href: '#',
//         },
//         {
//             id: 3,
//             name: 'item_3',
//             href: '#',
//         },
//         {
//             id: 4,
//             name: 'item_4',
//             href: '#',
//         },
//         {
//             id: 5,
//             name: 'item_5',
//             href: '#',
//         },
//         {
//             id: 6,
//             name: 'item_6',
//             href: '#',
//         },
//     ];
//
//     return (
//         <div className="absolute bg-black shadow-md p-4 top-full mt-2 z-10 bg-opacity-70">
//             <ul className="space-y-2">
//                 {navItem.map((item) => (
//                     <li key={item.id}>
//                         <a
//                             href={item.href}
//                             className="block text-white hover:text-[#E99C28] transition-colors"
//                         >
//                             {item.name}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

import React from "react";

export const Navigation = ({ items }: { items: string[] }) => {

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

