import axios from "axios";

export const getRestaurantCountByAttribute = async (
  location: string,
  attributes: string[],
  term: string = "restaurants"
) => {
  try {
    const resp = await axios.get("https://api.yelp.com/v3/businesses/search", {
      params: {
        location,
        term,
        attributes: attributes[0],
        sort_by: "best_match",
        limit: 1,
      },
      headers: {
        Authorization:
          "Bearer 0AAiyMkMgrcfbp5O9cCnEZeymvi-zR4QKKHlnTLxDGwa2u_DaG_ZYEDUqNAJk7TUDVudBuap7coO_BLusKJ7MH8y332b1-Mtk-zS3G0NLY0NK3cI-nskbGEIgQDLY3Yx",
      },
    });

    return (resp.data as { total: number }).total;
  } catch (error: any) {
    console.log(error)
    console.error(error.message)
  }
  return 0
};
