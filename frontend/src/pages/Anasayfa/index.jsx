import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/HomeCard';
import { birimGetir, cariGetir } from '../globalApi';

const Anasayfa = () => {

    const [sayi, setSayi] = useState({
        birim: 0,
        firma: 0
    });

    useEffect(() => {
        birimGetir().then(data => setSayi({ ...sayi, birim: data.data.length }))
        cariGetir().then(data => setSayi({ ...sayi, firma: data.data.length }))
    }, [])

    return (
        <div className='bg-gray-200 h-full'>
            <div className='p-2'>
                <div className='grid grid-cols-6 gap-x-4'>
                    <HomeCard color='bg-green-600' sayi={sayi.birim} isim="Birim Sayısı" />
                    <HomeCard color='bg-purple-600' sayi={sayi.firma} isim="Cari Sayısı" />
                    <HomeCard color='bg-yellow-600' isim="Malzeme Sayısı" />
                </div>
            </div>
        </div>
    )
}

export default Anasayfa