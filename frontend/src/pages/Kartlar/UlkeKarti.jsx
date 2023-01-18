import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import Modal from '../../components/Modal';
import { ulkeKaydet, ulkeGetir } from './api'

const FirmaKarti = () => {

    const [ulkeListesi, setUlkeListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const filtered = ulkeListesi.filter((item) => {
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
            if (!values.ULKE_ADI || !values.ORJ_ULKE_ADI || !values.ALAN_KODU || !values.KISA_KODU) {
                alert("Uyarı! \nKayıt yapabilmek için tüm alanları doldurunuz.");
                return false;
            }
            ulkeKaydet(values);
            bag.resetForm();
        },
    });

    const firmaSec = (item) => {
        formik.values.ULKE = item.ULKE_ADI
        formik.values.ULKE_KODU = item.KISA_KODU
    }

    useEffect(() => {
        ulkeGetir().then(data => {
            setUlkeListesi(data)
        })
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
            <div className='border-t border-gray-200 px-2'>
                <div className='flex gap-4 items-center justify-between my-2'>
                    <h1 className=' text-lg font-semibold'>Ülke Listesi</h1>
                    <div>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                        <label className='ml-2'>Ara</label>
                    </div>
                </div>
                <table className='w-full'>
                    <thead className='bg-green-200'>
                        <tr className='py-2'>
                            <td>ID #</td>
                            <td>Ülke Adı</td>
                            <td>Orj. Ülke Adı</td>
                            <td>Alan Kodu</td>
                            <td>Kısa Kod</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer border'>
                                    <td>{item.ID}</td>
                                    <td>{item.ULKE_ADI}</td>
                                    <td>{item.ORJ_ULKE_ADI}</td>
                                    <td>{item.ALAN_KODU}</td>
                                    <td>{item.KISA_KODU}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
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