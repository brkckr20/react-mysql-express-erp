export interface MalzemeKarti {
    ID: number;
    MALZEME_KODU: string;
    MALZEME_ADI: string;
    BIRIM: string;
    TEDARIKCI_KODU: string;
    TEDARIKCI_ADI: string;
    PASIF: number;
    MALZEME_GRUP: string;
    MALZEME_MARKA: string;
}

export interface ResponseDatas {
    message: string;
    code: number;
    data : MalzemeKarti[]
}

export interface ResponseDataSuccessfully {
    message: string;
    code: 200;
    data : []
}

export interface Cari {
    FIRMA_KODU: string;
    FIRMA_UNVANI: string;
    ADRES1: string;
    ADRES2: string;
    ULKE: string;
    ULKE_KODU: string;
    SEHIR: string;
    ILCE: string;
    POSTA_KODU: string;
    VERGI_DAIRESI: string;
    VERGI_NO: string;
    TELEFON: string;
    GIB_MAIL: string;
}

export interface Ulke{
    ULKE_ADI: string;
    ORJ_ULKE_ADI: string;
    ALAN_KODU: string;
    KISA_KODU: string;
}