import PropTypes from "prop-types";
import { asyncPostList } from "../fetch";

export const TRACKING_VI_TRI = {
  MENU: "menu",
  "TRANG-CHU": "trang-chu",
  HDSD: "hdsd",
  BDS: "bđs",
  "DU-AN": "dự án",
  FOOTER: "footer",
};

export const TRACKING_NAMES = {
  ["MENU_BDS"]: "BDS",
  ["MENU_CP-Startups"]: "CP Startups",
  ["MENU_CP-ZO"]: "CP ZO",
  ["MENU_Tin-tuc-ZO"]: "Tin tuc ZO",
  ["MENU_Tin-tuc-KM"]: "Tin tuc KM",
  ["MENU_Dang-ky"]: "Dang ky",
  ["MENU_Tai-ung-dung"]: "Tai ung dung",
  ["MENU_Taiungdung_appstore"]: "Taiungdung_appstore",
  ["MENU_Taiungdung_android"]: "Taiungdung_android",
  ["MENU_Huong-dan-su-dung"]: "Huong dan su dung",

  ["TRANG_CHU_Video_play"]: "Video_play",
  ["TRANG_CHU_Hesinhthai_ZG"]: "Hesinhthai_ZG",
  ["TRANG_CHU_Hesinhthai_VT"]: "Hesinhthai_VT",
  ["TRANG_CHU_Hesinhthai_ZTL"]: "Hesinhthai_ZTL",
  ["TRANG_CHU_Hesinhthai_ZB"]: "Hesinhthai_ZB",
  ["TRANG_CHU_Hesinhthai_Asia"]: "Hesinhthai_Asia",
  ["TRANG_CHU_Hesinhthai_TGT"]: "Hesinhthai_TGT",
  ["TRANG_CHU_Hesinhthai_ZF"]: "Hesinhthai_ZF",
  ["TRANG_CHU_Hesinhthai_AQ"]: "Hesinhthai_AQ",
  ["TRANG_CHU_Hesinhthai_ZA"]: "Hesinhthai_ZA",
  ["TRANG_CHU_Hoi-dap"]: "Trangchu_Hoidap",
  ["TRANG_CHU_Taiungdung_appstore"]: "Taiungdung_appstore",
  ["TRANG_CHU_Taiungdung_android"]: "Taiungdung_android",
  ["TRANG_CHU_SanPham_BDS"]: "SanPham_BDS",
  ["TRANG_CHU_SanPham_CPS"]: "SanPham_CP Startups",
  ["TRANG_CHU_SanPham_CPZ"]: "SanPham_CP ZO",

  ["HDSD_Danhmuc_HDDK"]: "Danhmuc_HDDK",
  ["HDSD_Danhmuc_HDĐT"]: "Danhmuc_HDĐT",
  ["HDSD_Danhmuc_HDNRT"]: "Danhmuc_HDNRT",
  ["HDSD_Danhmuc_HDGDSTC"]: "Danhmuc_HDGDSTC",
  ["HDSD_Danhmuc_Hoidap"]: "Danhmuc_Hoidap",
  ["BDS_Form"]: "BDS_Form",
  ["BDS_play"]: "BDS_play",
  ["DU_AN_Duan_LSR"]: "Duan_LSR",
  ["DU_AN_Duan_Zentower"]: "Duan_Zentower",
  ["DU_AN_Duan_TLF"]: "Duan_TLF",
  ["DU_AN_Duan_NBF"]: "Duan_NBF",
  ["FOOTER_Chinhsach_BDS"]: "Chinhsach_BDS",
  ["FOOTER_Chinhsach_CP"]: "Chinhsach_CP",
  ["FOOTER_Chinh-sach-gioi-thieu"]: "Chinh sach gioi thieu",
  ["FOOTER_Chinh-sach CTV"]: "Chinh sach CTV",
  ["FOOTER_Form-lien-he"]: "Form lien he",
  ["FOOTER_Dieu-khoan-su-sung"]: "Dieu khoan su sung",
  ["FOOTER_Ho-tro-KH"]: "Ho tro KH",
  ["FOOTER_Huong-dan-su-dung"]: "Huong dan su dung",
  ["FOOTER_Hoi-dap-thuong-gap"]: "Hoi dap thuong gap",
};

export const addtrackingEvent = async ({ vi_tri, field_id }) => {
  return await asyncPostList({
    access_token: process.env.public_token,
    collection_name: "tracking_clicks",
    data: {
      vi_tri,
      field_id,
      so_luong: 1,
    },
  });
};

addtrackingEvent.propTypes = {
  vi_tri: PropTypes.string.isRequired,
  field_id: PropTypes.string.isRequired,
};

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
