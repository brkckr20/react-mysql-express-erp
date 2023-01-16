import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { getData, birimGetir, cariGetir, malzemeGirisKaydet } from './api';
import Modal from '../../components/Modal';
import globalFilter from '../../utils/globalFilter';

const MalzemeGiris = () => {

    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [birimListesi, setBirimListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [kalem, setKalem] = useState([]);

    const handleSelectRow = (selectedItem) => {
        console.log(selectedItem);
        setKalem(kalems => [...kalems,
        {
            MALZEME_KODU: "",
            malzemeAdi: "",
            birim: "",
            adet: 0,
            pasif: "",
            malzemeGrup: "",
            malzemeMarka: "",
        }])
    }


    const filtered = globalFilter(malzemeListesi, filterText);
    const firmaFiltrele = globalFilter(cariListesi, filterCompany);

    const formik = useFormik({
        initialValues: {
            ISLEM_CINSI: 'MALZEME_GIRIS',
            TARIH: '',
            TEDARIKCI_KODU: '',
            TEDARIKCI_ADI: '',
            FATURA_NO: ''
        },
        onSubmit: (values, bag) => {
            malzemeGirisKaydet(values, "kaydet");
            // bag.resetForm();
        },
    });

    const firmaSec = (item) => {
        formik.values.TEDARIKCI_KODU = item.FIRMA_KODU
        formik.values.TEDARIKCI_ADI = item.FIRMA_UNVANI
    }

    useEffect(() => {
        getData().then(val => setMalzemeListesi(val))
        birimGetir().then(val => setBirimListesi(val))
        cariGetir().then(val => setCariListesi(val))
    }, [birimListesi])

    return (
        <>
            <div className='p-2'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                        <button title='Temizle' onClick={() => formik.handleReset()} type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="clear" size={35} />
                        </button>
                    </div>
                    <div className='flex w-full gap-x-2 bg-orange-200 p-2'>
                        <div>
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>İşlem Cinsi : </label>
                                <input value={formik.values.ISLEM_CINSI} disabled="disabled" onChange={formik.handleChange} name="ISLEM_CINSI" className='w-full border outline-none px-1' type="text" />
                            </div>
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Tarih : </label>
                                <input value={formik.values.TARIH} onChange={formik.handleChange} name="TARIH" className='w-full border outline-none px-1' type="date" />
                            </div>
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Kodu : </label>
                                <div className='flex border'>
                                    <input value={formik.values.TEDARIKCI_KODU} onChange={formik.handleChange} name="TEDARIKCI_KODU" className='w-full outline-none px-1' type="text" />
                                    <button type='button' className='bg-white' onClick={() => setModalShow(true)}><Icon name="dots" /></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Adı : </label>
                                <input value={formik.values.TEDARIKCI_ADI} onChange={formik.handleChange} name="TEDARIKCI_ADI" className='w-full border outline-none px-1' type="text" />
                            </div>
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Fatura No : </label>
                                <input value={formik.values.FATURA_NO} onChange={formik.handleChange} name="FATURA_NO" className='w-full border outline-none px-1' type="text" />
                            </div>
                        </div>
                    </div>
                    <div className='h-80 border mt-1'>
                        <div className='flex h-full'>
                            <div className='bg-gray-200 text-center w-10 shrink-0'>
                                <div className='my-1'>
                                    <button title="Yeni Satır Ekle">
                                        <Icon name="new" />
                                    </button>
                                </div>
                            </div>
                            <div className='w-full bg-red-200'>
                                <table className='bg-blue-800 w-full'>
                                    <thead className='overflow-x-scroll'>
                                        <tr className='text-white text-center overflow-x-scroll'>
                                            <td>Kalem İşlem</td>
                                            <td>Malzeme Kodu</td>
                                            <td>Malzeme Adı</td>
                                            <td>Miktar</td>
                                            <td>Birim</td>
                                            <td>Birim Fiyat</td>
                                            <td>Not</td>
                                            <td>Malzeme Grup</td>
                                            <td>Malzeme Marka</td>
                                            <td>Malzeme Marka</td>
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-x-scroll'>
                                        {
                                            kalem.map((i, k) => (
                                                <tr key={k} className="overflow-x-scroll">
                                                    <td><input type="text" placeholder='Malzeme Kodu' value={i.MALZEME_KODU} /></td>
                                                    <td><input type="text" placeholder='Malzeme Malzeme' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                    <td><input type="text" placeholder='Malzeme Kodu' /></td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2'>
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
                                <tr key={item.MALZEME_KODU} className='hover:bg-gray-200 duration-150 select-none cursor-pointer' onDoubleClick={() => handleSelectRow(item)}>
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
            </div>
            <Modal title="Firma Seçiniz" modalShow={modalShow} setModalShow={setModalShow} firmaSec={firmaSec}>
                <div>
                    <span>Ara : </span>
                    <input type="text" className='border outline-none pl-1' value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} />
                </div>
                <table className='w-full'>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td>Firma Kodu</td>
                            <td>Firma Adı</td>
                            <td>Adres</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            firmaFiltrele.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
                                    onDoubleClick={() => {
                                        firmaSec(item)
                                        setModalShow(false)
                                    }}>
                                    <td>{item.FIRMA_KODU}</td>
                                    <td>{item.FIRMA_UNVANI}</td>
                                    <td>{item.ADRES1}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal>
        </>
    )
}

export default MalzemeGiris