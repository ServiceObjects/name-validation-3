using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace name_validation_3_dot_net.REST
{
    public static class Helper
    {
        private static readonly HttpClient _client = new HttpClient();

        public static async Task<string> HttpGetAsync(string url, int timeoutSeconds)
        {

            _client.Timeout = TimeSpan.FromSeconds(timeoutSeconds);
            HttpResponseMessage response = await _client.GetAsync(url).ConfigureAwait(false);
            string jsonResponse = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            return jsonResponse;
        }

        public static string HttpGet(string url, int timeoutSeconds)
        {
            _client.Timeout = TimeSpan.FromSeconds(timeoutSeconds);
            HttpResponseMessage response = _client.GetAsync(url).GetAwaiter().GetResult();
            string jsonResponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            return jsonResponse;
        }

        public static string UrlEncode(string value) => HttpUtility.UrlEncode(value ?? string.Empty);
    }
}
