import React from 'react'

export const NavbarWithSubmenu = () => {

    const firstLevel = [
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

    const secondLevelFirst = [
        {
            id: 11,
            name: 'item_11',
            href: '#'
        },
        {
            id: 12,
            name: 'item_12',
            href: '#'
        },
        {
            id: 13,
            name: 'item_13',
            href: '#'
        },
        {
            id: 14,
            name: 'item_14',
            href: '#'
        },
    ]

    const secondLevelSecond = [
        {
            id: 21,
            name: 'item_11',
            href: '#'
        },
        {
            id: 22,
            name: 'item_22',
            href: '#'
        },
        {
            id: 23,
            name: 'item_23',
            href: '#'
        },
    ]

    export const NavbarWithSubmenu = () => {
        return (
            <div>
                <ul className="ul">
                    {firstLevel.map((item, index) => (
                        <li key={item.id}>
                            {item.name}
                            {index === 1 && ( // показываем подменю только для второго элемента
                                <ul className="submenu">
                                    {secondLevelFirst.map(subItem => (
                                        <li key={subItem.id}>
                                            {subItem.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}