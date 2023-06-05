import Cookies from "js-cookie";
import { ShippingAddres } from "src/core/product/entity";
export const getAddressFromCookies = (): ShippingAddres => {
    return {
      name        : Cookies.get("name") || "",
      surnames    : Cookies.get("surnames") || "",
      address     : Cookies.get("address") || "",
      address2    : Cookies.get("address2") || "",
      city        : Cookies.get("city") || "",
      country     : Cookies.get("country") || "",
      postalCode  : Cookies.get("postalCode") || "",
      phone       : Cookies.get("phone") || "",
    };
  };

  export const saveAddressInCookies = (data: ShippingAddres) => {
    Cookies.set("name", data.name);
    Cookies.set("surnames", data.surnames);
    Cookies.set("address", data.address);
    Cookies.set("address2", data.address2);
    Cookies.set("city", data.city);
    Cookies.set("country", data.country);
    Cookies.set("postalCode", data.postalCode.toString());
    Cookies.set("phone", data.phone.toString());
  }

  export const deleteAddressInCookies = () => {
      Cookies.remove("token");
      Cookies.remove("cart");
      Cookies.remove("name");
      Cookies.remove("surnames");
      Cookies.remove("address");
      Cookies.remove("address2");
      Cookies.remove("city");
      Cookies.remove("country");
      Cookies.remove("postalCode");
      Cookies.remove("phone");
}