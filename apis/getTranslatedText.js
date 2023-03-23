import { isEmpty } from "@/utils/lodash";
import { useRouter } from "next/router";
import { asyncGet, asyncPost } from "./fetch";

const labels = {};

export async function getLabelsList() {
  let public_token = process.env.public_token;

  let condition = {
    labelid: process.env.app_code,
  };
  let url = `${
    process.env.server_url_report
  }/api/labelinfo?access_token=${public_token}&q=${JSON.stringify(condition)}`;

  try {
    let _rs = await asyncGet(url);

    _rs.forEach((r) => {
      labels[r.textid] = r;
    });
  } catch (e) {
    console.error("can't get labels list", e);
  }
}
export async function createLabel(data) {
  if (!labels || isEmpty(labels)) return;
  let public_token = process.env.public_token;
  let trustkey = process.env.trustkey;

  let url = `${process.env.server_url_report}/api/labelinfo?access_token=${public_token}&trustkey=${trustkey}`;
  try {
    await asyncPost({
      url,
      data: data,
      method: "POST",
    });

    labels[data.textid] = data;
  } catch (e) {
    //console.log("can't create default label",e,data.textid);
  }
}

export async function useGetLabel(
  textid,
  defaultv = "",
  defaulte = "",
  lang = ""
) {
  const { locale } = useRouter();

  if (!textid) return "";

  let _default, field;
  if (!lang) lang = locale;
  if (lang === "vi") {
    _default = defaultv || defaulte || textid;
    field = "textv";
  } else {
    _default = defaulte || defaultv || textid;
    field = "texte";
  }

  try {
    let _label;
    if (labels && labels[textid.toUpperCase()]) {
      _label = labels[textid.toUpperCase()][field];
    }
    if (!_label) {
      _label = _default || textid;
      //create label default
      let condition = {
        labelid: process.env.app_code,
        textid: textid.toUpperCase(),
      };
      condition.texte = defaulte || defaultv || textid;
      condition.textv = defaultv || defaulte || textid;

      await createLabel(condition);
    }
    return _label || "";
  } catch (e) {
    return _default || textid || "";
  }
}
