import React from 'react'

export const Navigation = () => {

    const navItem = [
        {
            id: 1,
            name: 'item_1',
            href: '#'
        },
        {
            id: 2,
            name: 'item_2',
            href: '#'
        },
        {
            id: 3,
            name: 'item_3',
            href: '#'
        },
        {
            id: 4,
            name: 'item_4',
            href: '#'
        },
        {
            id: 5,
            name: 'item_5',
            href: '#'
        },
        {
            id: 6,
            name: 'item_6',
            href: '#'
        },
    ]

    return (
        <div>
            <ul className="ul">
                {navItem.map((item) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
