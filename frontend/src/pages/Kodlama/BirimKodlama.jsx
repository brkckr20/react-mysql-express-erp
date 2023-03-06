import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import Bildirim, { basarili } from '../../components/Bildirim';
import { birimKaydet } from './api';
import { birimGetir } from '../globalApi'

const BirimKodlama = () => {

    const [birimListesi, setBirimListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    /* yeni kayıt mı güncelleme mi */
    const [isNew, setIsNew] = useState(true);

    const filtered = birimListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            BIRIM_ADI: '',
            KISA_KODU: '',
            DEPO_ADI: '',
            YENI_KAYITMI: isNew,

        },
        onSubmit: async (values, bag) => {
            if (!values.BIRIM_ADI || !values.KISA_KODU | !values.DEPO_ADI) {
                alert("Uyarı! \nKayıt yapabilmek için tüm alanları doldurunuz.");
                return false;
            }
            const { message, code } = await birimKaydet(values);
            if (code === 200) {
                basarili(message);
            }
            bag.resetForm();
        },
    });

    useEffect(() => {
        birimGetir().then(data => {
            setBirimListesi(data.data)
        });
    }, [birimListesi])

    return (
        <>
            <div className='p-2 max-w-md'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Birim Adı : </label>
                        <input value={formik.values.BIRIM_ADI} onChange={formik.handleChange} name="BIRIM_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Kısa Kod : </label>
                        <input value={formik.values.KISA_KODU} onChange={formik.handleChange} name="KISA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Depo Adı : </label>
                        <input value={formik.values.DEPO_ADI} onChange={formik.handleChange} name="DEPO_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2'>
                <div className='flex gap-4 items-center justify-between my-2 border-b pb-2'>
                    <h1 className=' text-lg font-semibold'>Ülke Listesi</h1>
                    <div>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                        <label className='ml-2'>Ara</label>
                    </div>
                </div>
                <table className=''>
                    <thead className='bg-green-200'>
                        <tr className='py-2 divide-x'>
                            {/* <td className='w-[50px] text-center'>ID #</td> */}
                            <td className='w-[100px] text-center'>Birim Adı</td>
                            <td className='w-[100px] text-center'>Kısa Kod</td>
                            <td className='w-[100px] text-center'>Depo Adı</td>
                            <td className='w-[100px] text-center'>İşlem</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(item => (
                                <tr key={item.id} className='hover:bg-gray-200 duration-150 select-none cursor-pointer border divide-x'>
                                    {/* <td className='w-[50px]  text-center'>{item.ID}</td> */}
                                    <td className='w-[100px]  text-center'>{item.ad}</td>
                                    <td className='w-[50px]  text-center'>{item.kisa_kod}</td>
                                    <td className='w-[50px]  text-center'>{item.depo}</td>
                                    <td className='w-[50px]'>
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => console.log("update button clicked")}><Icon name="update" /></button>
                                            <button onClick={() => console.log("trash button clicked")}><Icon name="trash" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Bildirim />
        </>
    )
}

export default BirimKodlama