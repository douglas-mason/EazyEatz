const V3BusinessInfo = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          business_id_or_alias: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.',
          },
        },
        required: ['business_id_or_alias'],
      },
      {
        type: 'object',
        properties: {
          locale: {
            type: 'string',
            pattern: '^[a-z]{2,3}_[A-Z]{2}$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n',
          },
          device_platform: {
            type: 'string',
            enum: ['android', 'ios', 'mobile-generic'],
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Determines the platform for mobile_link',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      description: 'A full representation of a business',
      type: 'object',
      required: [
        'alias',
        'categories',
        'coordinates',
        'display_phone',
        'hours',
        'id',
        'image_url',
        'is_claimed',
        'is_closed',
        'location',
        'name',
        'phone',
        'photos',
        'rating',
        'review_count',
        'transactions',
        'url',
      ],
      properties: {
        id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
        alias: {
          description:
            'Unique Yelp alias of this business. Can contain unicode characters.\nExample: \'yelp-san-francisco\'. Also see <a href="https://www.yelp.com/developers/faq#difference-between-id-and-alias" target="_blank">What\'s the difference between the Yelp business ID and business alias?</a>\n',
          type: 'string',
        },
        name: { description: 'Name of this business.', type: 'string' },
        image_url: { description: 'URL of photo for this business', type: 'string' },
        is_closed: {
          description: 'Whether business has been (permanently) closed',
          type: 'boolean',
        },
        url: { description: 'URL for business page on Yelp.', type: 'string' },
        review_count: { description: 'Number of reviews for this business.', type: 'int' },
        categories: {
          description: 'List of category title and alias pairs associated with this business.',
          type: 'array',
          items: {
            description: 'A list of Yelp Categories.',
            type: 'array',
            items: {
              type: 'object',
              description: 'Category that the business falls in.',
              required: ['alias', 'title'],
              properties: {
                alias: {
                  description:
                    'Alias of a category, when searching for business in certain categories, use alias rather than the title.',
                  type: 'string',
                },
                title: { description: 'Title of a category for display purpose.', type: 'string' },
              },
            },
          },
        },
        rating: {
          description: 'Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).',
          type: 'decimal',
        },
        coordinates: {
          type: 'object',
          description: 'Coordinates of this business.',
          required: ['latitude', 'longitude'],
          properties: {
            latitude: { description: 'Latitude position on map.', type: 'decimal' },
            longitude: { description: 'Longitude position on map.', type: 'decimal' },
          },
        },
        transactions: {
          description:
            'List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.',
          type: 'array',
          items: { type: 'string' },
        },
        price: {
          description: 'Price level of the business. Value is one of $, $$, $$$ and $$$$.',
          type: 'string',
        },
        location: {
          description:
            'Location of this business, including address, city, state, zip code and country.',
          type: 'object',
          required: ['display_address'],
          properties: {
            address1: { description: 'Street address of this business.', type: 'string' },
            address2: {
              description: 'Street address of this business, continued.',
              type: 'string',
            },
            address3: {
              description: 'Street address of this business, continued.',
              type: 'string',
            },
            city: { description: 'City of this business.', type: 'string' },
            zip_code: {
              description:
                '[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
              type: 'string',
            },
            country: {
              description:
                '[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
              type: 'string',
            },
            state: {
              description:
                '[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
              type: 'string',
            },
            display_address: {
              description:
                "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.",
              type: 'array',
              items: { type: 'string' },
            },
            cross_streets: { type: 'string', description: 'Cross streets of this address' },
          },
        },
        phone: { description: 'Phone number of the business.', type: 'string' },
        display_phone: {
          description:
            "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.",
          type: 'string',
        },
        distance: {
          description:
            'Distance in meters from the search location. This value is in meters(m) regardless of the locale.',
          type: 'decimal',
        },
        hours: {
          type: 'array',
          description: 'Regular business hours',
          items: {
            type: 'object',
            required: ['hour_type', 'open', 'is_open_now'],
            properties: {
              hour_type: { type: 'string', description: 'Type of business hours' },
              open: {
                type: 'array',
                description: 'List of open hours',
                items: {
                  type: 'object',
                  required: ['is_overnight', 'start', 'end', 'day'],
                  properties: {
                    day: { type: 'integer', description: 'Day of the week.' },
                    start: {
                      type: 'string',
                      description:
                        'Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.',
                    },
                    end: {
                      type: 'string',
                      description:
                        'End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.',
                    },
                    is_overnight: {
                      type: 'boolean',
                      description:
                        'Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.',
                    },
                  },
                },
              },
              is_open_now: { type: 'boolean', description: 'Whether the business is open now' },
            },
          },
        },
        attributes: {
          description: 'Various features or facilities provided by the business.',
          type: 'object',
          additionalProperties: true,
        },
        is_claimed: {
          type: 'boolean',
          description: 'Whether business has been claimed by a business owner',
        },
        date_opened: { type: 'string', description: 'Business opening date' },
        date_closed: { type: 'string', description: 'Business closing date' },
        photos: {
          type: 'array',
          description: 'URLs of up to three photos of the business',
          items: { type: 'string' },
        },
        special_hours: {
          type: 'array',
          description:
            "Out of the ordinary hours for the business that apply on certain dates. Whenever these are set, they will override the regular business hours found in the 'hours' field.",
          items: {
            type: 'object',
            required: ['date'],
            properties: {
              date: {
                type: 'string',
                format: 'date',
                description:
                  'An [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) date string representing the date for which these special hours apply.',
              },
              start: {
                type: 'string',
                description:
                  'Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.',
              },
              end: {
                type: 'string',
                description:
                  'End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.',
              },
              is_overnight: {
                type: 'boolean',
                description:
                  'Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.',
              },
              is_closed: {
                type: 'boolean',
                description:
                  'Whether this particular special hour represents a date where the business is closed.',
              },
            },
          },
        },
        messaging: {
          type: 'object',
          description:
            'Information and action links for messaging with this business via Yelp, including requesting quotes.',
          required: ['url', 'use_case_text'],
          properties: {
            url: {
              type: 'string',
              description:
                'Visit this action link URL to go directly into the business messaging flow for this business.',
            },
            use_case_text: {
              type: 'string',
              description:
                'Indicates what kind of messaging can be done with the business.\ne.g., "Request a Quote" for a home services business, or "Request a Consultation" for a legal services business. This text will be localized (see <a href="https://docs.developer.yelp.com/docs/graphql-localization" target="_blank">Localization</a>).\n',
            },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3BusinessMatch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            maxLength: 64,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "The name of the business. Only digits, letters, spaces, and !#$%&+,./:?@'are allowed.",
          },
          address1: {
            type: 'string',
            maxLength: 64,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "The first line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed. An empty string is allowed; this will specifically match certain service businesses that have no street address.",
          },
          address2: {
            type: 'string',
            maxLength: 64,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "The second line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed.",
          },
          address3: {
            type: 'string',
            maxLength: 64,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "The third line of the business's address. Only digits, letters, spaces, and '/#&,.: are allowed.",
          },
          city: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "The city of the business. Only digits, letters, spaces, and '.() are allowed.",
          },
          state: {
            type: 'string',
            minLength: 1,
            maxLength: 3,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
          },
          country: {
            type: 'string',
            minLength: 2,
            maxLength: 2,
            pattern: '[A-Z]{2}',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
          },
          postal_code: {
            type: 'string',
            maxLength: 12,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'The [Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
          },
          latitude: {
            type: 'number',
            minimum: -90,
            maximum: 90,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.',
          },
          longitude: {
            type: 'number',
            minimum: -180,
            maximum: 180,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.',
          },
          phone: {
            type: 'string',
            minLength: 1,
            maxLength: 32,
            pattern: '^[0-9 +()-.x/]+$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'The phone number of the business which can be submitted as\n(a) locally formatted with digits only (e.g., 016703080) or\n(b) internationally formatted with a leading + sign and digits only after (+35316703080).\n',
          },
          yelp_business_id: {
            type: 'string',
            minLength: 22,
            maxLength: 22,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Unique Yelp identifier of the business if available. Used as a hint when finding a matching business.',
          },
          limit: {
            type: 'integer',
            default: 3,
            minimum: 1,
            maximum: 10,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results to return.',
          },
          match_threshold: {
            type: 'string',
            default: 'default',
            enum: ['none', 'default', 'strict'],
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Specifies whether a match quality threshold should be applied to the matched businesses. Must be one of the following.\n**none:** Do not apply any match quality threshold; all potential business matches will be returned.\n**default:** Apply a match quality threshold such that only very closely matching businesses will be returned.\n**strict:** Apply a very strict match quality threshold.\n',
          },
        },
        required: ['name', 'address1', 'city', 'state', 'country'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['businesses'],
      properties: {
        businesses: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'alias', 'coordinates', 'location', 'phone', 'display_phone'],
            properties: {
              id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
              alias: {
                description:
                  "Unique Yelp alias of this business. Can contain unicode characters.\nExample: 'yelp-san-francisco'. Also see [What's the difference between the Yelp business ID and business alias](https://www.yelp.com/developers/faq#difference-between-id-and-alias)?\n",
                type: 'string',
              },
              name: { description: 'Name of the business', type: 'string' },
              coordinates: {
                type: 'object',
                description: 'Coordinates of this business.',
                required: ['latitude', 'longitude'],
                properties: {
                  latitude: { description: 'Latitude position on map.', type: 'decimal' },
                  longitude: { description: 'Longitude position on map.', type: 'decimal' },
                },
              },
              location: {
                description:
                  'Location of this business, including address, city, state, zip code and country.',
                type: 'object',
                required: ['display_address'],
                properties: {
                  address1: { description: 'Street address of this business.', type: 'string' },
                  address2: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  address3: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  city: { description: 'City of this business.', type: 'string' },
                  zip_code: {
                    description:
                      '[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
                    type: 'string',
                  },
                  country: {
                    description:
                      '[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
                    type: 'string',
                  },
                  state: {
                    description:
                      '[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
                    type: 'string',
                  },
                  display_address: {
                    description:
                      "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.",
                    type: 'array',
                    items: { type: 'string' },
                  },
                  cross_streets: { type: 'string', description: 'Cross streets of this address' },
                },
              },
              phone: { description: 'Phone number of the business.', type: 'string' },
              display_phone: {
                description:
                  "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.",
                type: 'string',
              },
            },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3BusinessPhoneSearch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          phone: {
            type: 'string',
            minLength: 1,
            maxLength: 32,
            pattern: '^[0-9 +()-.x/]+$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Phone number of the business you want to search for. It must start with + and include the country code, like +14159083801.',
          },
          locale: {
            type: 'string',
            pattern: '^[a-z]{2,3}_[A-Z]{2}$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n',
          },
        },
        required: ['phone'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['businesses', 'total'],
      properties: {
        businesses: {
          type: 'array',
          items: {
            type: 'object',
            description: 'A Business Yelp finds based on the search criteria.',
            required: [
              'id',
              'alias',
              'name',
              'image_url',
              'is_closed',
              'url',
              'review_count',
              'categories',
              'rating',
              'location',
              'coordinates',
              'transactions',
              'phone',
              'display_phone',
            ],
            properties: {
              id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
              alias: {
                description:
                  'Unique Yelp alias of this business. Can contain unicode characters.\nExample: \'yelp-san-francisco\'. Also see <a href="https://www.yelp.com/developers/faq#difference-between-id-and-alias" target="_blank">What\'s the difference between the Yelp business ID and business alias?</a>\n',
                type: 'string',
              },
              name: { description: 'Name of this business.', type: 'string' },
              image_url: { description: 'URL of photo for this business', type: 'string' },
              is_closed: {
                description: 'Whether business has been (permanently) closed',
                type: 'boolean',
              },
              url: { description: 'URL for business page on Yelp.', type: 'string' },
              review_count: { description: 'Number of reviews for this business.', type: 'int' },
              categories: {
                description:
                  'List of category title and alias pairs associated with this business.',
                type: 'array',
                items: {
                  description: 'A list of Yelp Categories.',
                  type: 'array',
                  items: {
                    type: 'object',
                    description: 'Category that the business falls in.',
                    required: ['alias', 'title'],
                    properties: {
                      alias: {
                        description:
                          'Alias of a category, when searching for business in certain categories, use alias rather than the title.',
                        type: 'string',
                      },
                      title: {
                        description: 'Title of a category for display purpose.',
                        type: 'string',
                      },
                    },
                  },
                },
              },
              rating: {
                description: 'Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).',
                type: 'decimal',
              },
              coordinates: {
                type: 'object',
                description: 'Coordinates of this business.',
                required: ['latitude', 'longitude'],
                properties: {
                  latitude: { description: 'Latitude position on map.', type: 'decimal' },
                  longitude: { description: 'Longitude position on map.', type: 'decimal' },
                },
              },
              transactions: {
                description:
                  'List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.',
                type: 'array',
                items: { type: 'string' },
              },
              price: {
                description: 'Price level of the business. Value is one of $, $$, $$$ and $$$$.',
                type: 'string',
              },
              location: {
                description:
                  'Location of this business, including address, city, state, zip code and country.',
                type: 'object',
                required: ['display_address'],
                properties: {
                  address1: { description: 'Street address of this business.', type: 'string' },
                  address2: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  address3: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  city: { description: 'City of this business.', type: 'string' },
                  zip_code: {
                    description:
                      '[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
                    type: 'string',
                  },
                  country: {
                    description:
                      '[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
                    type: 'string',
                  },
                  state: {
                    description:
                      '[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
                    type: 'string',
                  },
                  display_address: {
                    description:
                      "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.",
                    type: 'array',
                    items: { type: 'string' },
                  },
                  cross_streets: { type: 'string', description: 'Cross streets of this address' },
                },
              },
              phone: { description: 'Phone number of the business.', type: 'string' },
              display_phone: {
                description:
                  "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.",
                type: 'string',
              },
              distance: {
                description:
                  'Distance in meters from the search location. This value is in meters(m) regardless of the locale.',
                type: 'decimal',
              },
              hours: {
                type: 'array',
                description: 'Regular business hours',
                items: {
                  type: 'object',
                  required: ['hour_type', 'open', 'is_open_now'],
                  properties: {
                    hour_type: { type: 'string', description: 'Type of business hours' },
                    open: {
                      type: 'array',
                      description: 'List of open hours',
                      items: {
                        type: 'object',
                        required: ['is_overnight', 'start', 'end', 'day'],
                        properties: {
                          day: { type: 'integer', description: 'Day of the week.' },
                          start: {
                            type: 'string',
                            description:
                              'Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.',
                          },
                          end: {
                            type: 'string',
                            description:
                              'End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.',
                          },
                          is_overnight: {
                            type: 'boolean',
                            description:
                              'Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.',
                          },
                        },
                      },
                    },
                    is_open_now: {
                      type: 'boolean',
                      description: 'Whether the business is open now',
                    },
                  },
                },
              },
              attributes: {
                description: 'Various features or facilities provided by the business.',
                type: 'object',
                additionalProperties: true,
              },
            },
          },
        },
        total: {
          description:
            'Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 1000. In such case, you still can only get up to 1000 businesses using multiple queries and combinations of the "limit" and "offset" parameters.\n',
          type: 'int',
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3BusinessSearch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            minLength: 1,
            maxLength: 250,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required if either *latitude* or *longitude* is not provided.\nThis string indicates the geographic area to be used when searching for businesses.\nExamples: "New York City", "NYC", "350 5th Ave, New York, NY 10118".\nBusinesses returned in the response may not be strictly within the specified location.\n',
          },
          latitude: {
            type: 'number',
            minimum: -90,
            maximum: 90,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.',
          },
          longitude: {
            type: 'number',
            minimum: -180,
            maximum: 180,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.',
          },
          term: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Search term, e.g. "food" or "restaurants".\nThe term may also be the business\'s name, such as "Starbucks". If term is not included the endpoint will default to searching across businesses from a small number of popular categories.\n',
          },
          radius: {
            type: 'integer',
            minimum: 0,
            maximum: 40000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'A suggested search radius in meters. This field is used as a suggestion to the search. The actual search radius may be lower than the suggested radius in dense urban areas, and higher in regions of less business density.\nIf the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40,000 meters (about 25 miles).\n',
          },
          categories: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            uniqueItems: true,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Categories to filter the search results with. See the list of supported categories. The category filter can be a list of comma delimited categories.\ne.g., "bars,french" will filter by Bars OR French.\nThe category alias should be used (e.g. "discgolf", not "Disc Golf").\n',
          },
          locale: {
            type: 'string',
            pattern: '^[a-z]{2,3}_[A-Z]{2}$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n',
          },
          price: {
            type: 'array',
            maxItems: 4,
            uniqueItems: true,
            items: { type: 'integer', minimum: 1, maximum: 4 },
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels.\ne.g., "1, 2, 3" will filter the results to show the ones that are $, $$, or $$$.\n',
          },
          open_now: {
            type: 'boolean',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'When set to true, only return the businesses that are open now.\nNotice that _open_at_ and _open_now_ cannot be used together.\n',
          },
          open_at: {
            type: 'integer',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'An integer representing the Unix time in the timezone of the search location. If specified, it will return businesses open at the given time.\nNotice that *open_at* and *open_now* cannot be used together.\n',
          },
          attributes: {
            type: 'array',
            items: { type: 'string' },
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Try these additional filters to return specific search results!\n* *hot_and_new* - popular businesses which recently joined Yelp\n* *request_a_quote* - businesses which actively reply to Request a Quote inquiries\n* *reservation* - businesses with Yelp Reservations bookings enabled on their profile page\n* *waitlist_reservation* - businesses with Yelp _Wait List_ bookings enabled on their profile screen (iOS/Android)\n* *deals* - businesses offering Yelp Deals on their profile page\n* *gender_neutral_restrooms* - businesses which provide gender neutral restrooms\n* *open_to_all* - businesses which are Open To All\n* *wheelchair_accessible* - businesses which are Wheelchair Accessible\n\nYou can combine multiple attributes by providing a comma separated like "attribute1,attribute2".\nIf multiple attributes are used, only businesses that satisfy all the attributes will be returned in search results.\ne.g., the attributes "*hot_and_new*,*request_a_quote*" will return businesses that are \'Hot and New\', and offer \'Request a Quote\'.\n',
          },
          sort_by: {
            type: 'string',
            default: 'best_match',
            enum: ['best_match', 'rating', 'review_count', 'distance'],
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Suggestion to the search algorithm that the results be sorted by one of the these modes: *best_match*, *rating*, *review_count* or *distance*.\nThe default is *best_match*. Note that specifying the sort_by is a suggestion (not strictly enforced) to Yelp's search, which considers multiple input parameters to return the most relevant results.\n\ne.g., the *rating* sort is not strictly sorted by the rating value, but by an adjusted rating value that takes into account the number of ratings,\nsimilar to a Bayesian average. This is to prevent skewing results to businesses with a single review.\n",
          },
          device_platform: {
            type: 'string',
            enum: ['android', 'ios', 'mobile-generic'],
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Determines the platform for mobile_link',
          },
          reservation_date: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The date for the reservation, format is YYYY-mm-dd',
          },
          reservation_time: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'The time of the requested reservation, format is HH:MM',
          },
          reservation_covers: {
            type: 'integer',
            minimum: 1,
            maximum: 10,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'How many people are attending the reservation',
          },
          matches_party_size_param: {
            type: 'boolean',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              "Whether to filter out results that don't have openings matching the params",
          },
          limit: {
            type: 'integer',
            default: 20,
            minimum: 0,
            maximum: 50,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Number of results to return.',
          },
          offset: {
            type: 'integer',
            minimum: 0,
            maximum: 1000,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Offset the list of returned results by this amount.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['businesses', 'total', 'region'],
      properties: {
        businesses: {
          type: 'array',
          items: {
            type: 'object',
            description: 'A Business Yelp finds based on the search criteria.',
            required: [
              'id',
              'alias',
              'name',
              'image_url',
              'is_closed',
              'url',
              'review_count',
              'categories',
              'rating',
              'location',
              'coordinates',
              'transactions',
              'phone',
              'display_phone',
            ],
            properties: {
              id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
              alias: {
                description:
                  'Unique Yelp alias of this business. Can contain unicode characters.\nExample: \'yelp-san-francisco\'. Also see <a href="https://www.yelp.com/developers/faq#difference-between-id-and-alias" target="_blank">What\'s the difference between the Yelp business ID and business alias?</a>\n',
                type: 'string',
              },
              name: { description: 'Name of this business.', type: 'string' },
              image_url: { description: 'URL of photo for this business', type: 'string' },
              is_closed: {
                description: 'Whether business has been (permanently) closed',
                type: 'boolean',
              },
              url: { description: 'URL for business page on Yelp.', type: 'string' },
              review_count: { description: 'Number of reviews for this business.', type: 'int' },
              categories: {
                description:
                  'List of category title and alias pairs associated with this business.',
                type: 'array',
                items: {
                  description: 'A list of Yelp Categories.',
                  type: 'array',
                  items: {
                    type: 'object',
                    description: 'Category that the business falls in.',
                    required: ['alias', 'title'],
                    properties: {
                      alias: {
                        description:
                          'Alias of a category, when searching for business in certain categories, use alias rather than the title.',
                        type: 'string',
                      },
                      title: {
                        description: 'Title of a category for display purpose.',
                        type: 'string',
                      },
                    },
                  },
                },
              },
              rating: {
                description: 'Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).',
                type: 'decimal',
              },
              coordinates: {
                type: 'object',
                description: 'Coordinates of this business.',
                required: ['latitude', 'longitude'],
                properties: {
                  latitude: { description: 'Latitude position on map.', type: 'decimal' },
                  longitude: { description: 'Longitude position on map.', type: 'decimal' },
                },
              },
              transactions: {
                description:
                  'List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.',
                type: 'array',
                items: { type: 'string' },
              },
              price: {
                description: 'Price level of the business. Value is one of $, $$, $$$ and $$$$.',
                type: 'string',
              },
              location: {
                description:
                  'Location of this business, including address, city, state, zip code and country.',
                type: 'object',
                required: ['display_address'],
                properties: {
                  address1: { description: 'Street address of this business.', type: 'string' },
                  address2: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  address3: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  city: { description: 'City of this business.', type: 'string' },
                  zip_code: {
                    description:
                      '[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
                    type: 'string',
                  },
                  country: {
                    description:
                      '[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
                    type: 'string',
                  },
                  state: {
                    description:
                      '[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
                    type: 'string',
                  },
                  display_address: {
                    description:
                      "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.",
                    type: 'array',
                    items: { type: 'string' },
                  },
                  cross_streets: { type: 'string', description: 'Cross streets of this address' },
                },
              },
              phone: { description: 'Phone number of the business.', type: 'string' },
              display_phone: {
                description:
                  "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.",
                type: 'string',
              },
              distance: {
                description:
                  'Distance in meters from the search location. This value is in meters(m) regardless of the locale.',
                type: 'decimal',
              },
              hours: {
                type: 'array',
                description: 'Regular business hours',
                items: {
                  type: 'object',
                  required: ['hour_type', 'open', 'is_open_now'],
                  properties: {
                    hour_type: { type: 'string', description: 'Type of business hours' },
                    open: {
                      type: 'array',
                      description: 'List of open hours',
                      items: {
                        type: 'object',
                        required: ['is_overnight', 'start', 'end', 'day'],
                        properties: {
                          day: { type: 'integer', description: 'Day of the week.' },
                          start: {
                            type: 'string',
                            description:
                              'Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.',
                          },
                          end: {
                            type: 'string',
                            description:
                              'End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.',
                          },
                          is_overnight: {
                            type: 'boolean',
                            description:
                              'Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.',
                          },
                        },
                      },
                    },
                    is_open_now: {
                      type: 'boolean',
                      description: 'Whether the business is open now',
                    },
                  },
                },
              },
              attributes: {
                description: 'Various features or facilities provided by the business.',
                type: 'object',
                additionalProperties: true,
              },
            },
          },
        },
        total: {
          description:
            'Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 1000. In such case, you still can only get up to 1000 businesses using multiple queries and combinations of the "limit" and "offset" parameters.\n',
          type: 'int',
        },
        region: {
          description: 'Suggested area in a map to display results in.',
          type: 'object',
          required: ['center'],
          properties: {
            center: {
              description: 'Center location of the region.',
              type: 'object',
              required: ['latitude', 'longitude'],
              properties: {
                latitude: { description: 'Latitude position on map.', type: 'decimal' },
                longitude: { description: 'Longitude position on map.', type: 'decimal' },
              },
            },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3BusinessServiceOfferings = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          business_id_or_alias: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'A unique identifier for a Yelp Business. Can be either a 22-character Yelp Business ID, or a Yelp Business Alias.',
          },
        },
        required: ['business_id_or_alias'],
      },
      {
        type: 'object',
        properties: {
          locale: {
            type: 'string',
            pattern: '^[a-z]{2,3}_[A-Z]{2}$',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Locale code in the format of {language code}_{country code}. See the [list of supported locales](https://docs.developer.yelp.com/docs/resources-supported-locales).\n',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['active', 'eligible'],
      properties: {
        active: {
          type: 'array',
          description: 'List of service offerings that are currently active',
          items: { type: 'string' },
        },
        eligible: {
          type: 'array',
          description: 'List of all service offerings that the business is eligible for',
          items: { type: 'string' },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3GetBusinessesEngagement = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          business_ids: {
            type: 'array',
            maxItems: 150,
            items: { type: 'string' },
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Business Id or alias of the businesses for which to get data.',
          },
          date_range_start: {
            type: 'string',
            format: 'date',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Start of the date range during which to get metrics. Defaults to the beginning of the most recently available week.',
          },
          date_range_end: {
            type: 'string',
            format: 'date',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'End of the date range during which to get metrics. Defaults to the end of the most recently available week.',
          },
        },
        required: ['business_ids'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['data'],
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            required: ['business_id', 'metrics'],
            properties: {
              business_id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
              metrics: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['start_of_week_date'],
                  properties: {
                    start_of_week_date: {
                      type: 'string',
                      description: 'Start date of the week for which metrics was requested.',
                      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
                    },
                    engagement_metric: {
                      type: 'integer',
                      description:
                        'Score on a scale of 1-20 to measure consumer engagement of a particular business',
                    },
                    intent_metric: {
                      type: 'integer',
                      description:
                        'Score on a scale of 1-10 to measure consumer intent of a particular business',
                    },
                    transaction_metric: {
                      type: 'integer',
                      description:
                        'Score on a scale of 1-4 to measure consumer transaction with a particular business',
                    },
                  },
                },
              },
            },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
const V3TransactionSearch = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          transaction_type: {
            type: 'string',
            default: 'delivery',
            enum: ['delivery'],
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Type of transaction supported by the business',
          },
        },
        required: ['transaction_type'],
      },
      {
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            minimum: -90,
            maximum: 90,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required, if _location_ is not provided. Latitude of the location to search from. If latitude is provided, longitude is required too.',
          },
          longitude: {
            type: 'number',
            minimum: -180,
            maximum: 180,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required if _location_ is not provided. Longitude of the location to search from. If longitude is provided, latitude is required too.',
          },
          location: {
            type: 'string',
            minLength: 1,
            maxLength: 250,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Required if either *latitude* or *longitude* is not provided.\nThis string indicates the geographic area to be used when searching for businesses.\nExamples: "New York City", "NYC", "350 5th Ave, New York, NY 10118".\nBusinesses returned in the response may not be strictly within the specified location.\n',
          },
          term: {
            type: 'string',
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Search term, e.g. "food" or "restaurants".\nThe term may also be the business\'s name, such as "Starbucks". If term is not included the endpoint will default to searching across businesses from a small number of popular categories.\n',
          },
          categories: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            uniqueItems: true,
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Categories to filter the search results with. See the list of supported categories. The category filter can be a list of comma delimited categories.\ne.g., "bars,french" will filter by Bars OR French.\nThe category alias should be used (e.g. "discgolf", not "Disc Golf").\n',
          },
          price: {
            type: 'array',
            maxItems: 4,
            uniqueItems: true,
            items: { type: 'integer', minimum: 1, maximum: 4 },
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description:
              'Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels.\ne.g., "1, 2, 3" will filter the results to show the ones that are $, $$, or $$$.\n',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      required: ['total', 'businesses'],
      properties: {
        businesses: {
          type: 'array',
          items: {
            type: 'object',
            description: 'A Business Yelp finds based on the search criteria.',
            required: [
              'id',
              'alias',
              'name',
              'image_url',
              'is_closed',
              'url',
              'review_count',
              'categories',
              'rating',
              'location',
              'coordinates',
              'transactions',
              'phone',
              'display_phone',
            ],
            properties: {
              id: { type: 'string', description: 'Yelp Encrypted Business ID.' },
              alias: {
                description:
                  'Unique Yelp alias of this business. Can contain unicode characters.\nExample: \'yelp-san-francisco\'. Also see <a href="https://www.yelp.com/developers/faq#difference-between-id-and-alias" target="_blank">What\'s the difference between the Yelp business ID and business alias?</a>\n',
                type: 'string',
              },
              name: { description: 'Name of this business.', type: 'string' },
              image_url: { description: 'URL of photo for this business', type: 'string' },
              is_closed: {
                description: 'Whether business has been (permanently) closed',
                type: 'boolean',
              },
              url: { description: 'URL for business page on Yelp.', type: 'string' },
              review_count: { description: 'Number of reviews for this business.', type: 'int' },
              categories: {
                description:
                  'List of category title and alias pairs associated with this business.',
                type: 'array',
                items: {
                  description: 'A list of Yelp Categories.',
                  type: 'array',
                  items: {
                    type: 'object',
                    description: 'Category that the business falls in.',
                    required: ['alias', 'title'],
                    properties: {
                      alias: {
                        description:
                          'Alias of a category, when searching for business in certain categories, use alias rather than the title.',
                        type: 'string',
                      },
                      title: {
                        description: 'Title of a category for display purpose.',
                        type: 'string',
                      },
                    },
                  },
                },
              },
              rating: {
                description: 'Rating for this business (value ranges from 1, 1.5, ... 4.5, 5).',
                type: 'decimal',
              },
              coordinates: {
                type: 'object',
                description: 'Coordinates of this business.',
                required: ['latitude', 'longitude'],
                properties: {
                  latitude: { description: 'Latitude position on map.', type: 'decimal' },
                  longitude: { description: 'Longitude position on map.', type: 'decimal' },
                },
              },
              transactions: {
                description:
                  'List of Yelp transactions that the business is registered for. Current supported values are **pickup**, **delivery** and **restaurant_reservation**.',
                type: 'array',
                items: { type: 'string' },
              },
              price: {
                description: 'Price level of the business. Value is one of $, $$, $$$ and $$$$.',
                type: 'string',
              },
              location: {
                description:
                  'Location of this business, including address, city, state, zip code and country.',
                type: 'object',
                required: ['display_address'],
                properties: {
                  address1: { description: 'Street address of this business.', type: 'string' },
                  address2: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  address3: {
                    description: 'Street address of this business, continued.',
                    type: 'string',
                  },
                  city: { description: 'City of this business.', type: 'string' },
                  zip_code: {
                    description:
                      '[Zip code](https://en.wikipedia.org/wiki/Postal_code) of this business.',
                    type: 'string',
                  },
                  country: {
                    description:
                      '[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of this business.',
                    type: 'string',
                  },
                  state: {
                    description:
                      '[ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) (with a few [exceptions](https://docs.developer.yelp.com/docs/resources-state-codes)) state code of this business.',
                    type: 'string',
                  },
                  display_address: {
                    description:
                      "Array of strings that if organized vertically give an address that is in the standard address format for the business's country.",
                    type: 'array',
                    items: { type: 'string' },
                  },
                  cross_streets: { type: 'string', description: 'Cross streets of this address' },
                },
              },
              phone: { description: 'Phone number of the business.', type: 'string' },
              display_phone: {
                description:
                  "Phone number of the business formatted nicely to be displayed to users. The format is the standard phone number format for the business's country.",
                type: 'string',
              },
              distance: {
                description:
                  'Distance in meters from the search location. This value is in meters(m) regardless of the locale.',
                type: 'decimal',
              },
              hours: {
                type: 'array',
                description: 'Regular business hours',
                items: {
                  type: 'object',
                  required: ['hour_type', 'open', 'is_open_now'],
                  properties: {
                    hour_type: { type: 'string', description: 'Type of business hours' },
                    open: {
                      type: 'array',
                      description: 'List of open hours',
                      items: {
                        type: 'object',
                        required: ['is_overnight', 'start', 'end', 'day'],
                        properties: {
                          day: { type: 'integer', description: 'Day of the week.' },
                          start: {
                            type: 'string',
                            description:
                              'Start of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 1000 means 10 AM.',
                          },
                          end: {
                            type: 'string',
                            description:
                              'End of the opening hours in a day, in [24-hour clock](https://en.wikipedia.org/wiki/24-hour_clock) notation, like 2130 means 9:30 PM.',
                          },
                          is_overnight: {
                            type: 'boolean',
                            description:
                              'Whether the special hours time range spans across midnight or not. When this is true, the end time will be lower than the start time.',
                          },
                        },
                      },
                    },
                    is_open_now: {
                      type: 'boolean',
                      description: 'Whether the business is open now',
                    },
                  },
                },
              },
              attributes: {
                description: 'Various features or facilities provided by the business.',
                type: 'object',
                additionalProperties: true,
              },
            },
          },
        },
        total: {
          description:
            'Total number of businesses Yelp finds based on the search criteria. Sometimes, the value may exceed 1000. In such case, you still can only get up to 1000 businesses using multiple queries and combinations of the "limit" and "offset" parameters.\n',
          type: 'int',
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: { type: 'string', description: 'The error code.' },
            description: { type: 'string', description: 'The description of the error.' },
          },
        },
      },
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
export {
  V3BusinessInfo,
  V3BusinessMatch,
  V3BusinessPhoneSearch,
  V3BusinessSearch,
  V3BusinessServiceOfferings,
  V3GetBusinessesEngagement,
  V3TransactionSearch,
};
