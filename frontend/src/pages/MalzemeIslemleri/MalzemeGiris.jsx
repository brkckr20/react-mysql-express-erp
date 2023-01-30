import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { getData, birimGetir, cariGetir, malzemeGirisKaydet, malzemeGirisGetir, malzemeGirisOncekiKayit } from './api';
import Modal from '../../components/Modal';
import globalFilter from '../../utils/globalFilter';
import LabelInput from '../../components/Inputs/LabelInput';
import { converDate } from '../../utils/converDate';

const MalzemeGiris = () => {

    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [birimListesi, setBirimListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [secilenKalem, setSecilenKalem] = useState({});
    const [kalem, setKalem] = useState([]);

    // önceki kayıtların listelenmesi işlemleri
    const [oncekiKayit, setOncekiKayit] = useState([]);
    const [gosterilenKayitId, setGosterilenKayitId] = useState(0);

    const handleSelectRow = (selectedItem) => {
        setKalem(kalems => [...kalems,
        {
            KALEM_ISLEM: selectedItem.KALEM_ISLEM,
            MALZEME_KODU: selectedItem.MALZEME_KODU,
            MALZEME_ADI: selectedItem.MALZEME_ADI,
            MIKTAR: 0,
            BIRIM: selectedItem.BIRIM,
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
            FATURA_NO: '',
            kalem
        },
        onSubmit: async (values) => {
            await malzemeGirisKaydet(values, kalem, "kaydet");
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

    const handleBirimUpdate = async (event, kod) => {
        secilenKalem.MIKTAR = event.target.value;
    }
    const handleKalemIslem = async (event, i) => {
        secilenKalem.KALEM_ISLEM = event.target.value;
    }

    const handleFocus = (i) => {
        const s = kalem.find(item => item.MALZEME_KODU === i.MALZEME_KODU)
        setSecilenKalem(s)
    }

    const satirSil = (kod) => {
        const result = kalem.filter(item => item.MALZEME_KODU !== kod);
        setKalem(result);
    }

    const kayitGetir = async (depoTipi) => {
        const veri = await malzemeGirisGetir(depoTipi);
        setGosterilenKayitId(veri[0].ID)
        setOncekiKayit(veri)
    }

    const oncekiKayitGetir = async (depoTipi, kayitNo) => {
        const veri = await malzemeGirisOncekiKayit(depoTipi, kayitNo);
        console.log(veri);
    }

    return (
        <>
            <div className='p-2'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Yeni' onClick={null} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="new" size={35} />
                        </button>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                        <button title='Güncelle' className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="update" size={35} />
                        </button>
                        <button title='Geri' type="button" onClick={() => oncekiKayitGetir("giris", [])} className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="arrowBack" size={35} />
                        </button>
                        <button title='İleri' type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="arrowNext" size={35} />
                        </button>
                        <button title='Vazgeç' type="button" onClick={() => kayitGetir("giris", gosterilenKayitId)} className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="giveUp" size={35} />
                        </button>
                        <button title='Sil' type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="trash" size={35} />
                        </button>
                    </div>
                    <div className='flex w-full gap-x-2 bg-orange-200 p-2'>
                        <div>
                            <LabelInput label="İşlem Cinsi : " value={formik.values.ISLEM_CINSI} disabled="disabled" onChange={formik.handleChange} name="ISLEM_CINSI" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Tarih : " value={oncekiKayit.length > 0 ? converDate(oncekiKayit[0].TARIH) : formik.values.TARIH} onChange={formik.handleChange} name="TARIH" className='w-full border outline-none px-1' type="date" />
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Kodu : </label>
                                <div className='flex border'>
                                    <input value={oncekiKayit.length > 0 ? oncekiKayit[0].FIRMA_KODU : formik.values.TEDARIKCI_KODU} onChange={formik.handleChange} name="TEDARIKCI_KODU" className='w-full outline-none px-1' type="text" />
                                    <button type='button' className='bg-white' onClick={() => setModalShow(true)}><Icon name="dots" /></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <LabelInput label="Tedarikçi Firma Adı : " value={oncekiKayit.length > 0 ? oncekiKayit[0].FIRMA_ADI : formik.values.TEDARIKCI_ADI} onChange={formik.handleChange} name="TEDARIKCI_ADI" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Fatura No : " value={formik.values.FATURA_NO} onChange={formik.handleChange} name="FATURA_NO" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Kayıt No : " disabled value={oncekiKayit.length > 0 ? oncekiKayit[0].ID : formik.values.FATURA_NO} name="KAYIT_NO" className='w-full border outline-none px-1' type="text" />
                        </div>
                    </div>
                    <div className='h-80 border mt-1'>
                        <div className='flex h-full'>
                            <div className='bg-gray-200 text-center w-6 shrink-0'>
                                <div className='my-1'>
                                    {/* <button title="Yeni Satır Ekle">
                                        <Icon name="new" />
                                    </button> */}
                                </div>
                            </div>
                            <div className='w-full overflow-x-auto'>
                                <table className=''>
                                    <thead className='bg-blue-800'>
                                        <tr className='text-white text-center overflow-x-scroll'>
                                            <td className='w-[40px] bg-red-600'>Sil</td>
                                            <td className='w-[200px]'>Kalem İşlem</td>
                                            <td className='w-[200px]'>Malzeme Kodu</td>
                                            <td className='w-[300px]'>Malzeme Adı</td>
                                            <td className='w-[200px]'>Miktar</td>
                                            <td className='w-[200px]'>Birim</td>
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-x-scroll'>
                                        {
                                            !oncekiKayit.length > 0 ?
                                                kalem.map((i, k) => (
                                                    <tr key={k} className="overflow-x-scroll">
                                                        <td className='w-[40px] flex justify-center'><button type='button' onClick={() => satirSil(i.MALZEME_KODU)}><Icon name="trash" /></button></td>
                                                        <td className='w-[200px]'>
                                                            <select className='h-[23.98px] w-[200px]' onClick={() => handleFocus(i)} onChange={(e) => handleKalemIslem(e, i)} name="islemcinsi" id="">
                                                                <option value="">Seçiniz</option>
                                                                <option value="MALZEME GİRİŞ">MALZEME GİRİŞ</option>
                                                                <option value="TAMİR GİRİŞ">TAMİR GİRİŞ</option>
                                                                <option value="DOLUM GİRİŞ">DOLUM GİRİŞ</option>
                                                            </select>
                                                        </td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Malzeme Kodu' value={i.MALZEME_KODU} disabled="disabled" /></td>
                                                        <td className='w-[300px]'><input className='w-full' type="text" placeholder='Malzeme Adı' value={i.MALZEME_ADI} title={i.MALZEME_ADI} disabled="disabled" /></td>
                                                        <td className='w-[200px]'><input type="number" placeholder='Miktar'
                                                            onChange={(e) => handleBirimUpdate(e, i)}
                                                            onFocus={() => handleFocus(i)}
                                                        /></td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Birim' value={i.BIRIM} disabled="disabled" /></td>
                                                    </tr>
                                                ))
                                                : oncekiKayit.map((i, k) => (
                                                    <tr key={k} className="overflow-x-scroll">
                                                        <td className='w-[40px] flex justify-center'><button type='button' onClick={() => satirSil(i.MALZEME_KODU)}><Icon name="trash" /></button></td>
                                                        <td className='w-[200px]'>
                                                            <select className='h-[23.98px] w-[200px]' onClick={() => handleFocus(i)} onChange={(e) => handleKalemIslem(e, i)} name="islemcinsi" id="">
                                                                <option value={i.KALEM_ISLEM}>{i.KALEM_ISLEM}</option>
                                                            </select>
                                                        </td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Malzeme Kodu' value={i.MALZEME_KODU} disabled="disabled" /></td>
                                                        <td className='w-[300px]'><input className='w-full' type="text" placeholder='Malzeme Adı' value={i.MALZEME_ADI} title={i.MALZEME_ADI} disabled="disabled" /></td>
                                                        <td className='w-[200px]'><input type="number" placeholder='Miktar' value={i.MIKTAR}
                                                            onChange={(e) => handleBirimUpdate(e, i)}
                                                            onFocus={() => handleFocus(i)}
                                                        /></td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Birim' value={i.BIRIM} disabled="disabled" /></td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
            <div className='border-t border-gray-200 px-2 overflow-x-auto'>
                <div className='flex gap-4 items-center my-2'>
                    <h1 className=' text-lg font-semibold'>Malzeme Kartı</h1>
                    <div>
                        <label className='mr-2'>Ara : </label>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                        <button className='border px-1' onClick={() => setFilterText("")}>X</button>
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