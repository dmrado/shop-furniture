import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'
import { isAdmin } from '@/actions/isAdmin.ts'
import { ALERTS_ENABLED } from '@/app/constants.ts'

export default async function HeaderButtons() {
    const session = await getServerSession()
    if (session && session.user) {
        return (<>
            <div
                className='flex justify-between items-center relative left-0 right-0 py-2 px-10'>
                <p className='mr-2 sm:px-2 sm:flex-nowrap'>{session.user.name}</p>
                <div className='mr-4'>
                    {
                        !!session.user.image && !!session.user.name &&
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            width={52}
                            height={52}
                            className='rounded-full'
                        />
                    }
                    {/*    </div>*/}
                </div>

                <div className='flex flex-wrap '>
                    {isAdmin(session) &&
                        <Link href={'/admin/new'}>
                            <button className='button_green'>Добавить товар</button>
                        </Link>
                    }

                    {ALERTS_ENABLED && isAdmin(session) &&
                        <Link href={'/alerts'}>
                            <button className='button_blue'>Добавить объявление</button>
                        </Link>
                    }

                    <Link href={'/api/auth/signout'}>
                        <button className='button_red'>Выйти из аккаунта</button>
                    </Link>

                </div>
            </div>
        </>
        )
    }
    return (<>
        <Link href={'/api/auth/signin'}>
            <button className='button_green'>Войти</button>
        </Link>
    </>
    )
}
