import React from 'react';
import ListElement from './ListElement';

import { genel } from '../process/Genel'
import { depoYonetimi } from '../process/DepoYonetimi'
import { kartlar } from '../process/Kartlar';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='max-w-xs w-full h-full border-r border-gray-300 shrink-0'>
            <div className='flex justify-between items-center px-2'>
                <Link className='text-center p-2 text-3xl text-purple-700 font-bold' to="/">Portal v.1.0</Link>
                <button onClick={() => console.log("exit")} className='bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 duration-200'>Çıkış</button>
            </div>
            <div className='mx-2'>
                <ListElement iconName="home" title="Genel Bilgiler" subTitles={genel} />
                <ListElement iconName="wareHouse" title="Sarf Malzeme İşlemleri" subTitles={depoYonetimi} />
                <ListElement iconName="process" title="Kartlar" subTitles={kartlar} />
            </div>
        </nav>
    )
}
export default Navbar
