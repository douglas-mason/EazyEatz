import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type V3BusinessInfoMetadataParam = FromSchema<typeof schemas.V3BusinessInfo.metadata>;
export type V3BusinessInfoResponse200 = FromSchema<(typeof schemas.V3BusinessInfo.response)['200']>;
export type V3BusinessInfoResponse400 = FromSchema<(typeof schemas.V3BusinessInfo.response)['400']>;
export type V3BusinessInfoResponse401 = FromSchema<(typeof schemas.V3BusinessInfo.response)['401']>;
export type V3BusinessInfoResponse403 = FromSchema<(typeof schemas.V3BusinessInfo.response)['403']>;
export type V3BusinessInfoResponse404 = FromSchema<(typeof schemas.V3BusinessInfo.response)['404']>;
export type V3BusinessInfoResponse413 = FromSchema<(typeof schemas.V3BusinessInfo.response)['413']>;
export type V3BusinessInfoResponse429 = FromSchema<(typeof schemas.V3BusinessInfo.response)['429']>;
export type V3BusinessInfoResponse500 = FromSchema<(typeof schemas.V3BusinessInfo.response)['500']>;
export type V3BusinessInfoResponse503 = FromSchema<(typeof schemas.V3BusinessInfo.response)['503']>;
export type V3BusinessMatchMetadataParam = FromSchema<typeof schemas.V3BusinessMatch.metadata>;
export type V3BusinessMatchResponse200 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['200']
>;
export type V3BusinessMatchResponse400 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['400']
>;
export type V3BusinessMatchResponse401 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['401']
>;
export type V3BusinessMatchResponse403 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['403']
>;
export type V3BusinessMatchResponse404 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['404']
>;
export type V3BusinessMatchResponse413 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['413']
>;
export type V3BusinessMatchResponse429 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['429']
>;
export type V3BusinessMatchResponse500 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['500']
>;
export type V3BusinessMatchResponse503 = FromSchema<
  (typeof schemas.V3BusinessMatch.response)['503']
>;
export type V3BusinessPhoneSearchMetadataParam = FromSchema<
  typeof schemas.V3BusinessPhoneSearch.metadata
>;
export type V3BusinessPhoneSearchResponse200 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['200']
>;
export type V3BusinessPhoneSearchResponse400 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['400']
>;
export type V3BusinessPhoneSearchResponse401 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['401']
>;
export type V3BusinessPhoneSearchResponse403 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['403']
>;
export type V3BusinessPhoneSearchResponse404 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['404']
>;
export type V3BusinessPhoneSearchResponse413 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['413']
>;
export type V3BusinessPhoneSearchResponse429 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['429']
>;
export type V3BusinessPhoneSearchResponse500 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['500']
>;
export type V3BusinessPhoneSearchResponse503 = FromSchema<
  (typeof schemas.V3BusinessPhoneSearch.response)['503']
>;
export type V3BusinessSearchMetadataParam = FromSchema<typeof schemas.V3BusinessSearch.metadata>;
export type V3BusinessSearchResponse200 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['200']
>;
export type V3BusinessSearchResponse400 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['400']
>;
export type V3BusinessSearchResponse401 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['401']
>;
export type V3BusinessSearchResponse403 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['403']
>;
export type V3BusinessSearchResponse404 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['404']
>;
export type V3BusinessSearchResponse413 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['413']
>;
export type V3BusinessSearchResponse429 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['429']
>;
export type V3BusinessSearchResponse500 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['500']
>;
export type V3BusinessSearchResponse503 = FromSchema<
  (typeof schemas.V3BusinessSearch.response)['503']
>;
export type V3BusinessServiceOfferingsMetadataParam = FromSchema<
  typeof schemas.V3BusinessServiceOfferings.metadata
>;
export type V3BusinessServiceOfferingsResponse200 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['200']
>;
export type V3BusinessServiceOfferingsResponse400 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['400']
>;
export type V3BusinessServiceOfferingsResponse401 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['401']
>;
export type V3BusinessServiceOfferingsResponse403 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['403']
>;
export type V3BusinessServiceOfferingsResponse404 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['404']
>;
export type V3BusinessServiceOfferingsResponse413 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['413']
>;
export type V3BusinessServiceOfferingsResponse429 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['429']
>;
export type V3BusinessServiceOfferingsResponse500 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['500']
>;
export type V3BusinessServiceOfferingsResponse503 = FromSchema<
  (typeof schemas.V3BusinessServiceOfferings.response)['503']
>;
export type V3GetBusinessesEngagementMetadataParam = FromSchema<
  typeof schemas.V3GetBusinessesEngagement.metadata
>;
export type V3GetBusinessesEngagementResponse200 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['200']
>;
export type V3GetBusinessesEngagementResponse400 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['400']
>;
export type V3GetBusinessesEngagementResponse401 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['401']
>;
export type V3GetBusinessesEngagementResponse403 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['403']
>;
export type V3GetBusinessesEngagementResponse404 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['404']
>;
export type V3GetBusinessesEngagementResponse413 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['413']
>;
export type V3GetBusinessesEngagementResponse429 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['429']
>;
export type V3GetBusinessesEngagementResponse500 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['500']
>;
export type V3GetBusinessesEngagementResponse503 = FromSchema<
  (typeof schemas.V3GetBusinessesEngagement.response)['503']
>;
export type V3TransactionSearchMetadataParam = FromSchema<
  typeof schemas.V3TransactionSearch.metadata
>;
export type V3TransactionSearchResponse200 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['200']
>;
export type V3TransactionSearchResponse400 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['400']
>;
export type V3TransactionSearchResponse401 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['401']
>;
export type V3TransactionSearchResponse403 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['403']
>;
export type V3TransactionSearchResponse404 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['404']
>;
export type V3TransactionSearchResponse413 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['413']
>;
export type V3TransactionSearchResponse429 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['429']
>;
export type V3TransactionSearchResponse500 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['500']
>;
export type V3TransactionSearchResponse503 = FromSchema<
  (typeof schemas.V3TransactionSearch.response)['503']
>;
