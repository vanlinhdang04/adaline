import slugify from "@/utils/slugifyString";

export const useMenu = (data) => {
  // console.log(data);
  if (!data) return [];
  let menu = [];
  const menuParent = data.filter((item) => item.stt === "1");
  const menuChildren = data.filter((item) => item.stt === "2");

  menuParent.map((item) => {
    menu.push({
      ...item,
      title: item.ten_danh_muc,
      href: `/collections/${item.slug}?cat=${menuChildren
        .filter((cat) => cat.danh_muc_me === item.ma_danh_muc)
        .map((el) => el.ma_danh_muc)
        .join("|")}&page=1`,
      subMenu: {
        subMenuLeft: [],
        subMenuRight: [],
      },
    });
  });
  menuChildren.map((item) => {
    const { ten_danh_muc_me } = item;
    const positionParent = menu
      .map(function (e) {
        return e.title;
      })
      .indexOf(ten_danh_muc_me);
    if (positionParent >= 0) {
      menu[positionParent].subMenu.subMenuLeft.push({
        ...item,
        title: item.ten_danh_muc,
        href: `/collections/${slugify(item.ten_danh_muc_me)}?cat=${
          item.ma_danh_muc
        }&page=1`,
      });
      if (item.logo || item.image) {
        menu[positionParent].subMenu.subMenuRight.push({
          ...item,
          title: item.ten_danh_muc,
          href: `/collections/${slugify(item.ten_danh_muc_me)}?cat=${
            item.ma_danh_muc
          }&page=1`,
          image: item.logo || item.image,
        });
      }
    }
  });

  menu.unshift({
    title: "Sản phẩm mới",
    href: `/collections/san-pham-moi?cat=${menuChildren
      .map((el) => el.ma_danh_muc)
      .join("|")}&sort=newest`,
  });
  menu.push(
    {
      title: "Khuyến mãi",
      href: `/collections/san-pham-moi?cat=${menuChildren
        .map((el) => el.ma_danh_muc)
        .join("|")}&filterBy=promotion`,
    },
    {
      title: "Liên hệ",
      href: "/lien-he",
    }
  );

  return { menu, menuParent };
};
