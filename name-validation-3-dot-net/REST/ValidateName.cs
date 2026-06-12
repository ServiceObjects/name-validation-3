using System.Text.Json;

namespace name_validation_3_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Name Validation 3 (NV3) REST API's ValidateName endpoint.
    /// </summary>
    public class ValidateNameClient
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/NV3/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/NV3/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/NV3/";

        /// <summary>
        /// Synchronously calls the ValidateName REST endpoint to retrieve name validation information.
        /// </summary>
        /// <param name="input">The input parameters including name components, options, and authentication ID.</param>
        /// <returns>Deserialized <see cref="ValidateNameResponse"/> containing either nameResult or statusDetail.</returns>
        public static ValidateNameResponse Invoke(ValidateNameInput input)
        {
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            string jsonResponse = Helper.HttpGet(url, input.TimeoutSeconds);

            ValidateNameResponse response = DeserializeValidateNameResponse(jsonResponse);

            if (input.IsLive && response.NameResult == null && response.StatusDetail == null)
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                string fallbackJsonResponse = Helper.HttpGet(fallbackUrl, input.TimeoutSeconds);

                response = DeserializeValidateNameResponse(fallbackJsonResponse);
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the ValidateName REST endpoint to retrieve name validation information.
        /// </summary>
        /// <param name="input">The input parameters including name components, options, and authentication ID.</param>
        /// <returns>Deserialized <see cref="ValidateNameResponse"/> containing either nameResult or statusDetail.</returns>
        public static async Task<ValidateNameResponse> InvokeAsync(ValidateNameInput input)
        {
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            string jsonResponse = await Helper.HttpGetAsync(url, input.TimeoutSeconds).ConfigureAwait(false);

            ValidateNameResponse response = DeserializeValidateNameResponse(jsonResponse);

            if (input.IsLive && response.NameResult == null && response.StatusDetail == null)
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                string fallbackJsonResponse = await Helper.HttpGetAsync(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);

                response = DeserializeValidateNameResponse(fallbackJsonResponse);
            }

            return response;
        }

        private static ValidateNameResponse DeserializeValidateNameResponse(string jsonResponse)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            ValidateNameResponse? response =
                JsonSerializer.Deserialize<ValidateNameResponse>(jsonResponse, options);

            if (response == null)
            {
                throw new Exception("Failed to deserialize ValidateName response.");
            }

            if (response.NameResult == null && response.StatusDetail == null)
            {
                throw new Exception("Unknown response format from ValidateName API.");
            }

            return response;
        }

        public static string BuildUrl(ValidateNameInput input, string baseUrl)
        {
            string qs = $"ValidateName?" +
                        $"FullName={Helper.UrlEncode(input.FullName)}" +
                        $"&Prefix={Helper.UrlEncode(input.Prefix)}" +
                        $"&FirstName={Helper.UrlEncode(input.FirstName)}" +
                        $"&MiddleName={Helper.UrlEncode(input.MiddleName)}" +
                        $"&LastName={Helper.UrlEncode(input.LastName)}" +
                        $"&Suffix={Helper.UrlEncode(input.Suffix)}" +
                        $"&Options={Helper.UrlEncode(input.Options)}" +
                        $"&AuthID={Helper.UrlEncode(input.AuthID)}";

            return baseUrl + qs;
        }

        /// <summary>
        /// Input parameters for the ValidateName API call. Represents a name to validate.
        /// </summary>
        /// <param name="FullName">The full name to validate.</param>
        /// <param name="Prefix">The prefix of the name.</param>
        /// <param name="FirstName">The first name.</param>
        /// <param name="MiddleName">The middle name.</param>
        /// <param name="LastName">The last name.</param>
        /// <param name="Suffix">The suffix of the name.</param>
        /// <param name="Options">Comma-separated list of optional parameters.</param>
        /// <param name="AuthID">The authentication ID provided by Service Objects.</param>
        /// <param name="IsLive">Indicates whether to use the live service or trial service.</param>
        /// <param name="TimeoutSeconds">Timeout duration for the API call, in seconds.</param>
        public record ValidateNameInput(
            string FullName = "",
            string Prefix = "",
            string FirstName = "",
            string MiddleName = "",
            string LastName = "",
            string Suffix = "",
            string Options = "",
            string AuthID = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}