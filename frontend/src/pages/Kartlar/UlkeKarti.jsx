import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import Modal from '../../components/Modal';
import { ulkeKaydet, ulkeGetir } from './api'

const FirmaKarti = () => {

    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [ulkeListesi, setUlkeListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const filtered = malzemeListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            ULKE_ADI: '',
            ORJ_ULKE_ADI: '',
            ALAN_KODU: '',
            KISA_KODU: '',

        },
        onSubmit: (values, bag) => {
            ulkeKaydet(values);
            bag.resetForm();
        },
    });

    const firmaSec = (item) => {
        formik.values.ULKE = item.ULKE_ADI
        formik.values.ULKE_KODU = item.KISA_KODU
    }

    useEffect(() => {
        ulkeGetir().then(data => setUlkeListesi(data))
    }, [])

    return (
        <>
            <div className='p-2 max-w-md'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                        <button title='Temizle' onClick={formik.resetForm} type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="clear" size={35} />
                        </button>
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Ülke Adı : </label>
                        <input value={formik.values.ULKE_ADI} onChange={formik.handleChange} name="ULKE_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Orj. Ülke Adı : </label>
                        <input value={formik.values.ORJ_ULKE_ADI} onChange={formik.handleChange} name="ORJ_ULKE_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Alan Kodu : </label>
                        <input value={formik.values.ALAN_KODU} onChange={formik.handleChange} name="ALAN_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Kısa Kod : </label>
                        <input value={formik.values.KISA_KODU} onChange={formik.handleChange} name="KISA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                </form>
            </div>
            {/*             <div className='border-t border-gray-200 px-2'>
                <div className='flex gap-4 items-center my-2'>
                    <h1 className=' text-lg font-semibold'>Malzeme Listesi</h1>
                    <div>
                        <label className='mr-2'>Ara : </label>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                    </div>
                </div>
                <table className='w-full'>
                    <thead className='bg-green-200'>
                        <tr className='py-2'>
                            <td>Malz. Kodu</td>
                            <td>Malz. Adı</td>
                            <td>Malz. Birim</td>
                            <td>Ted. Firma Kodu</td>
                            <td>Ted. Firma Adı</td>
                            <td>Pasif ?</td>
                            <td>Malz. Grup</td>
                            <td>Malz. Marka</td>
                            <td>İşlem</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(item => (
                                <tr key={item.MALZEME_KODU} className='hover:bg-gray-200 duration-150 select-none cursor-pointer' >
                                    <td>{item.MALZEME_KODU}</td>
                                    <td>{item.MALZEME_ADI}</td>
                                    <td>{item.BIRIM}</td>
                                    <td>{item.TEDARIKCI_KODU}</td>
                                    <td>{item.TEDARIKCI_ADI}</td>
                                    <td>{item.PASIF}</td>
                                    <td>{item.MALZEME_GRUP}</td>
                                    <td>{item.MALZEME_MARKA}</td>
                                    <td><Icon name="update" size={20} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div> */}
            <Modal title="Ülke Seçiniz" modalShow={modalShow} setModalShow={setModalShow}>
                <table className='w-full'>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td>Ülke Adı</td>
                            <td>Ülke Kodu</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ulkeListesi.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
                                    onDoubleClick={() => {
                                        firmaSec(item)
                                        setModalShow(false)
                                    }}>
                                    <td>{item.ULKE_ADI}</td>
                                    <td>{item.KISA_KODU}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal>
        </>
    )
}

export default FirmaKarti