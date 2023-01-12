import React from 'react';
import ListElement from './ListElement';

import { genel } from '../process/Genel'
import { depoYonetimi } from '../process/DepoYonetimi'
import { kartlar } from '../process/Kartlar';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='max-w-xs w-full h-full border-r border-gray-300'>
            <div className='text-center p-2 text-3xl text-purple-700 font-bold'>
                <Link to="/">Sistem Takip</Link>
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
