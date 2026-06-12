import axios from 'axios';
import queryString from 'querystring';
import { NV3Response, NameResult, StatusDetail } from './nv3_response.js';

/**
 * @constant
 * @type {string}
 * @description Base URL for the live Service Objects Name Validation 3 (NV3) API service.
 */
const liveBaseUrl = 'https://sws.serviceobjects.com/NV3/';

/**
 * @constant
 * @type {string}
 * @description Base URL for the backup Service Objects Name Validation 3 (NV3) API service.
 */
const backupBaseUrl = 'https://swsbackup.serviceobjects.com/NV3/';

/**
 * @constant
 * @type {string}
 * @description Trial URL for the backup Service Objects Name Validation 3 (NV3) API service.
 */
const trialBaseUrl = 'https://trial.serviceobjects.com/NV3/';

/**
 * Checks if a response from the API is valid by verifying that it has no StatusDetail object
 * @param {NV3Response} response - The response object to check
 * @returns {boolean} - True if the response is valid, false otherwise
 */
const isValid = (response) => !response?.NameResult !==null;

/**
 * Constructs the full API URL by combining the base URL and URL-encoded query string parameters
 * derived from the input parameters.
 * @param {string} baseUrl - The base URL for the API endpoint (live, backup, or trial)
 * @param {Object} params - The query parameters for the API request
 * @returns {string} - The full API URL
 */
const buildUrl = (baseUrl, params) => 
    `${baseUrl}ValidateName?${queryString.stringify(params)}`;

/**
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * @param {string} url - The URL to send the GET request to
 * @param {number} timeoutSeconds - The timeout for the request in seconds
 * @returns {Promise<NV3Response>} - A promise that resolves to an NV3Response object containing the API response data
 * @throws {Error} - Throws an error if the request fails
 */
export const httpGet = async (url, timeoutSeconds) => {
    let result = new NV3Response();
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });

        if (response.status === 200) {
            result.Status = response.data.status ?? null;
            result.NameResult = response.data.nameResult ? new NameResult(response.data.nameResult) : null;
            result.StatusDetail = response.data.statusDetail ? new StatusDetail(response.data.statusDetail) : null;
        }
        else {
            result.Status = null;
            result.NameResult = null;
            result.StatusDetail = null;
        }
    } catch (error) {
        throw new Error(`HTTP GET request failed: ${error.message}`);
    }
    return result;
};

const ValidateNameClient = {
    /**
     * Provides functionality to call the Service Objects Name Validation 3 (NV3) API's ValidateName endpoint,
     * retrieving name validation and  classification details for a given name. Includes fallback to backup 
     * endpoint for reliability in live mode.
     * @param {string} [FullName] - The full name to validate. Optional to use instead of individual name components.
     * @param {string} [Prefix] - The name prefix to validate. Optional.
     * @param {string} [FirstName] - The first name to validate. Optional if FullName is provided.
     * @param {string} [MiddleName] - The middle name to validate. Optional.
     * @param {string} [LastName] - The last name to validate. Optional if FullName is provided.
     * @param {string} [Suffix] - The name suffix to validate. Optional.
     * @param {string} [Options] - Additional options for the API request. Optional.
     * @param {string} AuthID - The license key for authenticating with the API. Required.
     * @param {boolean} [isLive=true] - Whether to use the live API endpoint (true) or the trial endpoint (false).
     * @param {number} [timeoutSeconds=15] - The timeout for the API request in seconds. Optional, defaults to 15 seconds.
     * @returns {Promise<NV3Response>} A promise that resolves to a NV3Response object.
    */
    async invokeAsync(FullName, Prefix, FirstName, MiddleName, LastName, Suffix, Options, AuthID, isLive = true, timeoutSeconds = 15) {
        const params = {
            FullName,
            Prefix,
            FirstName,
            MiddleName,
            LastName,
            Suffix,
            Options,
            AuthID
        };

        const url = buildUrl(isLive ? liveBaseUrl : trialBaseUrl, params);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(backupBaseUrl, params);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return fallbackResponse;
        }

        return response;
    },

    /**
     * Synchronously invokes the ValidateName API endpoint by wrapping the async call
     * and awaiting its result immediately. Note: This method should be used cautiously
     * in Node.js as it blocks the event loop.
     * @param {string} [FullName] - The full name to validate. Optional to use instead of individual name components.
     * @param {string} [Prefix] - The name prefix to validate. Optional.
     * @param {string} [FirstName] - The first name to validate. Optional if FullName is provided.
     * @param {string} [MiddleName] - The middle name to validate. Optional.
     * @param {string} [LastName] - The last name to validate. Optional if FullName is provided.
     * @param {string} [Suffix] - The name suffix to validate. Optional.
     * @param {string} [Options] - Additional options for the API request. Optional.
     * @param {string} AuthID - The license key for authenticating with the API. Required.
     * @param {boolean} [isLive=true] - Whether to use the live API endpoint (true) or the trial endpoint (false).
     * @param {number} [timeoutSeconds=15] - The timeout for the API request in seconds. Optional, defaults to 15 seconds.
     * @returns {NV3Response} - The response from the API call
     */
    invoke(FullName, Prefix, FirstName, MiddleName, LastName, Suffix, Options, AuthID, isLive = true, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(
            FullName, Prefix, FirstName, MiddleName, LastName, Suffix, Options, AuthID, isLive, timeoutSeconds
        ))();
    }
};

export { ValidateNameClient, NV3Response };