import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'yelp-developers/1.0 (api/5.0.6)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * This endpoint returns up to 1000 businesses with some basic information based on the
   * provided search criteria.
   *
   * **Note:** The API does not return businesses without any reviews.
   *
   * @summary Search businesses
   */
  v3_business_search(
    metadata?: types.V3BusinessSearchMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3BusinessSearchResponse200>
    | FetchResponse<400, types.V3BusinessSearchResponse400>
    | FetchResponse<401, types.V3BusinessSearchResponse401>
    | FetchResponse<403, types.V3BusinessSearchResponse403>
    | FetchResponse<404, types.V3BusinessSearchResponse404>
    | FetchResponse<413, types.V3BusinessSearchResponse413>
    | FetchResponse<429, types.V3BusinessSearchResponse429>
    | FetchResponse<500, types.V3BusinessSearchResponse500>
    | FetchResponse<503, types.V3BusinessSearchResponse503>
  > {
    return this.core.fetch('/v3/businesses/search', 'get', metadata);
  }

  /**
   * This endpoint returns a list of businesses based on the provided phone number. It is
   * possible for more than one business to have the same phone number (for example, chain
   * stores with the same +1 800 phone number).
   *
   * Note: at this time, the API does not return businesses without any reviews.
   *
   * @summary Search businesses by phone number
   */
  v3_business_phone_search(
    metadata: types.V3BusinessPhoneSearchMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3BusinessPhoneSearchResponse200>
    | FetchResponse<400, types.V3BusinessPhoneSearchResponse400>
    | FetchResponse<401, types.V3BusinessPhoneSearchResponse401>
    | FetchResponse<403, types.V3BusinessPhoneSearchResponse403>
    | FetchResponse<404, types.V3BusinessPhoneSearchResponse404>
    | FetchResponse<413, types.V3BusinessPhoneSearchResponse413>
    | FetchResponse<429, types.V3BusinessPhoneSearchResponse429>
    | FetchResponse<500, types.V3BusinessPhoneSearchResponse500>
    | FetchResponse<503, types.V3BusinessPhoneSearchResponse503>
  > {
    return this.core.fetch('/v3/businesses/search/phone', 'get', metadata);
  }

  /**
   * This endpoint lets you match business data from other sources against businesses on
   * Yelp, based on provided business information.
   * For example, if you know a business's exact address and name, and you want to find that
   * business only on Yelp.
   *
   * <span style="color:red;font-weight:bold">When should you use the Business Match
   * endpoint?</span>
   * We have several endpoints that will return information on Yelp businesses. You should
   * pick the endpoint to use based on how specific your input information is.
   *
   * * [Business Match endpoint](https://docs.developer.yelp.com/reference/v3_business_match)
   * when you have precise info like name & address
   * * [Business Search
   * endpoint](https://docs.developer.yelp.com/reference/v3_business_search) when you have
   * general info on the biz like name & location but don't know the address
   * * [Phone Search
   * endpoint](https://docs.developer.yelp.com/reference/v3_business_phone_search) when you
   * only have the phone number or less confident about other matching criteria
   *
   * All of these endpoints return the same information about each business.
   *
   * **Note:** at this time, the API does not return businesses without any reviews.
   *
   * @summary Business Match
   */
  v3_business_match(
    metadata: types.V3BusinessMatchMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3BusinessMatchResponse200>
    | FetchResponse<400, types.V3BusinessMatchResponse400>
    | FetchResponse<401, types.V3BusinessMatchResponse401>
    | FetchResponse<403, types.V3BusinessMatchResponse403>
    | FetchResponse<404, types.V3BusinessMatchResponse404>
    | FetchResponse<413, types.V3BusinessMatchResponse413>
    | FetchResponse<429, types.V3BusinessMatchResponse429>
    | FetchResponse<500, types.V3BusinessMatchResponse500>
    | FetchResponse<503, types.V3BusinessMatchResponse503>
  > {
    return this.core.fetch('/v3/businesses/matches', 'get', metadata);
  }

  /**
   * This endpoint returns detailed business content.
   * Normally, you would get the Business ID from
   * [/v3/businesses/search](https://docs.developer.yelp.com/reference/v3_business_search),
   * [/v3/businesses/search/phone](https://docs.developer.yelp.com/reference/v3_business_phone_search),
   * [/v3/transactions/{transaction_type}/search](https://docs.developer.yelp.com/reference/v3_transaction_search)
   * or [/v3/autocomplete](https://docs.developer.yelp.com/reference/v3_autocomplete).
   * To retrieve review excerpts for a business, please refer to our Reviews endpoint
   * ([/v3/businesses/{id}/reviews](https://docs.developer.yelp.com/reference/v3_business_reviews))
   *
   * **Note:** at this time, the API does not return businesses without any reviews.
   *
   * @summary Get business by Id
   */
  v3_business_info(
    metadata: types.V3BusinessInfoMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3BusinessInfoResponse200>
    | FetchResponse<400, types.V3BusinessInfoResponse400>
    | FetchResponse<401, types.V3BusinessInfoResponse401>
    | FetchResponse<403, types.V3BusinessInfoResponse403>
    | FetchResponse<404, types.V3BusinessInfoResponse404>
    | FetchResponse<413, types.V3BusinessInfoResponse413>
    | FetchResponse<429, types.V3BusinessInfoResponse429>
    | FetchResponse<500, types.V3BusinessInfoResponse500>
    | FetchResponse<503, types.V3BusinessInfoResponse503>
  > {
    return this.core.fetch('/v3/businesses/{business_id_or_alias}', 'get', metadata);
  }

  /**
   * This endpoint returns a list of businesses which support requested transaction type.
   *
   * **Note:**
   * * At this time, the API does not return businesses without any reviews.
   * * Currently, this endpoint only supports food delivery in the US.
   *
   * @summary Search Business Transactions
   */
  v3_transaction_search(
    metadata: types.V3TransactionSearchMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3TransactionSearchResponse200>
    | FetchResponse<400, types.V3TransactionSearchResponse400>
    | FetchResponse<401, types.V3TransactionSearchResponse401>
    | FetchResponse<403, types.V3TransactionSearchResponse403>
    | FetchResponse<404, types.V3TransactionSearchResponse404>
    | FetchResponse<413, types.V3TransactionSearchResponse413>
    | FetchResponse<429, types.V3TransactionSearchResponse429>
    | FetchResponse<500, types.V3TransactionSearchResponse500>
    | FetchResponse<503, types.V3TransactionSearchResponse503>
  > {
    return this.core.fetch('/v3/transactions/{transaction_type}/search', 'get', metadata);
  }

  /**
   * Returns engagement metrics information for the provided businesses.
   * <blockquote class="callout callout_warn">
   *   This endpoint requires special permissions to be enabled for your Yelp Fusion API Key.
   * </blockquote>
   *
   * @summary Get Business engagement metrics
   */
  v3_get_businesses_engagement(
    metadata: types.V3GetBusinessesEngagementMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3GetBusinessesEngagementResponse200>
    | FetchResponse<400, types.V3GetBusinessesEngagementResponse400>
    | FetchResponse<401, types.V3GetBusinessesEngagementResponse401>
    | FetchResponse<403, types.V3GetBusinessesEngagementResponse403>
    | FetchResponse<404, types.V3GetBusinessesEngagementResponse404>
    | FetchResponse<413, types.V3GetBusinessesEngagementResponse413>
    | FetchResponse<429, types.V3GetBusinessesEngagementResponse429>
    | FetchResponse<500, types.V3GetBusinessesEngagementResponse500>
    | FetchResponse<503, types.V3GetBusinessesEngagementResponse503>
  > {
    return this.core.fetch('/v3/businesses/engagement', 'get', metadata);
  }

  /**
   * Returns active and eligible service offerings for a business.
   * <blockquote class="callout callout_warn">
   *   This endpoint requires special permissions to be enabled for your Yelp Fusion API Key.
   * </blockquote>
   *
   * @summary Get Service offerings for a business
   */
  v3_business_service_offerings(
    metadata: types.V3BusinessServiceOfferingsMetadataParam
  ): Promise<
    | FetchResponse<200, types.V3BusinessServiceOfferingsResponse200>
    | FetchResponse<400, types.V3BusinessServiceOfferingsResponse400>
    | FetchResponse<401, types.V3BusinessServiceOfferingsResponse401>
    | FetchResponse<403, types.V3BusinessServiceOfferingsResponse403>
    | FetchResponse<404, types.V3BusinessServiceOfferingsResponse404>
    | FetchResponse<413, types.V3BusinessServiceOfferingsResponse413>
    | FetchResponse<429, types.V3BusinessServiceOfferingsResponse429>
    | FetchResponse<500, types.V3BusinessServiceOfferingsResponse500>
    | FetchResponse<503, types.V3BusinessServiceOfferingsResponse503>
  > {
    return this.core.fetch(
      '/v3/businesses/{business_id_or_alias}/service_offerings',
      'get',
      metadata
    );
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  V3BusinessInfoMetadataParam,
  V3BusinessInfoResponse200,
  V3BusinessInfoResponse400,
  V3BusinessInfoResponse401,
  V3BusinessInfoResponse403,
  V3BusinessInfoResponse404,
  V3BusinessInfoResponse413,
  V3BusinessInfoResponse429,
  V3BusinessInfoResponse500,
  V3BusinessInfoResponse503,
  V3BusinessMatchMetadataParam,
  V3BusinessMatchResponse200,
  V3BusinessMatchResponse400,
  V3BusinessMatchResponse401,
  V3BusinessMatchResponse403,
  V3BusinessMatchResponse404,
  V3BusinessMatchResponse413,
  V3BusinessMatchResponse429,
  V3BusinessMatchResponse500,
  V3BusinessMatchResponse503,
  V3BusinessPhoneSearchMetadataParam,
  V3BusinessPhoneSearchResponse200,
  V3BusinessPhoneSearchResponse400,
  V3BusinessPhoneSearchResponse401,
  V3BusinessPhoneSearchResponse403,
  V3BusinessPhoneSearchResponse404,
  V3BusinessPhoneSearchResponse413,
  V3BusinessPhoneSearchResponse429,
  V3BusinessPhoneSearchResponse500,
  V3BusinessPhoneSearchResponse503,
  V3BusinessSearchMetadataParam,
  V3BusinessSearchResponse200,
  V3BusinessSearchResponse400,
  V3BusinessSearchResponse401,
  V3BusinessSearchResponse403,
  V3BusinessSearchResponse404,
  V3BusinessSearchResponse413,
  V3BusinessSearchResponse429,
  V3BusinessSearchResponse500,
  V3BusinessSearchResponse503,
  V3BusinessServiceOfferingsMetadataParam,
  V3BusinessServiceOfferingsResponse200,
  V3BusinessServiceOfferingsResponse400,
  V3BusinessServiceOfferingsResponse401,
  V3BusinessServiceOfferingsResponse403,
  V3BusinessServiceOfferingsResponse404,
  V3BusinessServiceOfferingsResponse413,
  V3BusinessServiceOfferingsResponse429,
  V3BusinessServiceOfferingsResponse500,
  V3BusinessServiceOfferingsResponse503,
  V3GetBusinessesEngagementMetadataParam,
  V3GetBusinessesEngagementResponse200,
  V3GetBusinessesEngagementResponse400,
  V3GetBusinessesEngagementResponse401,
  V3GetBusinessesEngagementResponse403,
  V3GetBusinessesEngagementResponse404,
  V3GetBusinessesEngagementResponse413,
  V3GetBusinessesEngagementResponse429,
  V3GetBusinessesEngagementResponse500,
  V3GetBusinessesEngagementResponse503,
  V3TransactionSearchMetadataParam,
  V3TransactionSearchResponse200,
  V3TransactionSearchResponse400,
  V3TransactionSearchResponse401,
  V3TransactionSearchResponse403,
  V3TransactionSearchResponse404,
  V3TransactionSearchResponse413,
  V3TransactionSearchResponse429,
  V3TransactionSearchResponse500,
  V3TransactionSearchResponse503,
} from './types';
