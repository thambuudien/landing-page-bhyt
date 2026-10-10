export interface TrackingData {
    List_TBL_DINH_VI: {
      NGAY_TRANG_THAI: string;
      NGAY: string;
      GIO: string;
      TRANG_THAI: string;
      VI_TRI: string;
      DIEN_THOAI: string;
    }[];
    List_TBL_DELIVERY: {
      NGAY_TRANG_THAI: string;
      GIO_TRANG_THAI: string;
      NGAY_PHAT: string;
      NGAY_NHAP: string | null;
      VI_TRI: string;
      TRANG_THAI: string;
    }[];
    List_TBL_DELIVERY_lIST: unknown | null;
    Code: string;
    Message: string;
    TBL_INFO: {
      Nuoc_Chapnhan: string;
      Nuoc_Phat: string;
      BC_GUI: string;
      BC_PHAT: string;
      HO_TEN_GUI: string;
      DIA_CHI_GUI: string;
      HO_TEN_NHAN: string;
      DIA_CHI_NHAN: string;
      LO: string;
      MA_KH: string;
      MA_THAM_CHIEU: string;
      KHOI_LUONG: string;
      MAE1: string;
      TRANG_THAI: string;
    };
  }
  