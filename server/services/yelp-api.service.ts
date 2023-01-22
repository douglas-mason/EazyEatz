import sdk from "@api/yelp-developers";

export const getRestaurantCountByAttribute = async (location: string, attributes: string[], term: string = "restaurants") => {
  sdk.auth(
    "Bearer 0AAiyMkMgrcfbp5O9cCnEZeymvi-zR4QKKHlnTLxDGwa2u_DaG_ZYEDUqNAJk7TUDVudBuap7coO_BLusKJ7MH8y332b1-Mtk-zS3G0NLY0NK3cI-nskbGEIgQDLY3Yx"
  );
  const response = await sdk
    .v3_business_search({
      location,
      term,
      attributes,
      sort_by: "best_match",
      limit: 1,
    });
    return (response.data as {total: number}).total;
    //.then(({ data }) => console.log(data))
    //.catch((err) => console.error(err));
};

// sdk
//   .v3_business_search({ sort_by: "best_match", limit: 20 })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

/*
{
  "businesses": [
    {
      "id": "woXlprCuowrLJswWere3TQ",
      "alias": "täkō-pittsburgh-4",
      "name": "täkō",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/W2J52omHmHj54VA4aZffZw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/t%C3%A4k%C5%8D-pittsburgh-4?adjust_creative=SW9I8wH9XmZm6zIUKAtqGg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=SW9I8wH9XmZm6zIUKAtqGg",
      "review_count": 1867,
      "categories": [
        {
          "alias": "newamerican",
          "title": "American (New)"
        },
        {
          "alias": "mexican",
          "title": "Mexican"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 40.4422285652929,
        "longitude": -80.0019846968895
      },
      "transactions": [
        "restaurant_reservation"
      ],
      "price": "$$",
      "location": {
        "address1": "214 6th St",
        "address2": "",
        "address3": "",
        "city": "Pittsburgh",
        "zip_code": "15222",
        "country": "US",
        "state": "PA",
        "display_address": [
          "214 6th St",
          "Pittsburgh, PA 15222"
        ]
      },
      "phone": "+14124718256",
      "display_phone": "(412) 471-8256",
      "distance": 2202.4879057771773
    }
  ],
  "total": 145,
  "region": {
    "center": {
      "longitude": -79.98046875,
      "latitude": 40.43108616989201
    }
  }
}
*/