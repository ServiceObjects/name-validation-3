using name_validation_3_dot_net.REST;

namespace name_validation_3_dot_net_examples
{
    public class ValidateNameRestSdkExample
    {
        public static void Go(string authID, bool isLive)
        {
            Console.WriteLine("\r\n-----------------------------------------------------------");
            Console.WriteLine("Name Validation 3 - ValidateName - REST SDK");
            Console.WriteLine("-----------------------------------------------------------");

            ValidateNameClient.ValidateNameInput validateNameInput = new(
                FullName: "",
                Prefix: "Mr.",
                FirstName: "John",
                MiddleName: "",
                LastName: "Smith",
                Suffix: "",
                Options: "",
                AuthID: authID,
                IsLive: isLive,
                TimeoutSeconds: 15
            );

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"FullName: {validateNameInput.FullName}");
            Console.WriteLine($"Prefix: {validateNameInput.Prefix}");
            Console.WriteLine($"FirstName: {validateNameInput.FirstName}");
            Console.WriteLine($"MiddleName: {validateNameInput.MiddleName}");
            Console.WriteLine($"LastName: {validateNameInput.LastName}");
            Console.WriteLine($"Suffix: {validateNameInput.Suffix}");
            Console.WriteLine($"Options: {validateNameInput.Options}");
            Console.WriteLine($"AuthID: {validateNameInput.AuthID}");
            Console.WriteLine($"IsLive: {validateNameInput.IsLive}");

            var response = ValidateNameClient.Invoke(validateNameInput);

            if (response.StatusDetail is null)
            {
                Console.WriteLine("\r\n* Name Details *\r\n");
                Console.WriteLine($"Status              : {response.Status}");
                Console.WriteLine($"IsValidName         : {response.NameResult?.IsValidName}");
                Console.WriteLine($"Classification      : {response.NameResult?.Classification}");
                Console.WriteLine($"Confidence          : {response.NameResult?.Confidence}");
                Console.WriteLine($"Text In             : {response.NameResult?.TextIn}");
                Console.WriteLine($"Text Out            : {response.NameResult?.TextOut}");
                Console.WriteLine($"Notes               : {response.NameResult?.Notes}");
                Console.WriteLine($"Warnings            : {response.NameResult?.Warnings}");
                Console.WriteLine($"First Name Found    : {response.NameResult?.FirstNameFound}");
                Console.WriteLine($"Is Common FirstName : {response.NameResult?.IsCommonFirstName}");
                Console.WriteLine($"Last Name Found     : {response.NameResult?.LastNameFound}");
                Console.WriteLine($"Is Common LastName  : {response.NameResult?.IsCommonLastName}");
                Console.WriteLine($"Similar First Names : {response.NameResult?.SimilarFirstNames}");
                Console.WriteLine($"Similar Last Names  : {response.NameResult?.SimilarLastNames}");
                Console.WriteLine($"Related Names       : {response.NameResult?.RelatedNames}");

                Console.WriteLine("\r\n* Parsed Name *\r\n");

                if (response.NameResult?.ParsedName is not null)
                {
                    Console.WriteLine($"Prefix    : {response.NameResult.ParsedName.Prefix}");
                    Console.WriteLine($"FirstName : {response.NameResult.ParsedName.First}");
                    Console.WriteLine($"MiddleName: {response.NameResult.ParsedName.Middle}");
                    Console.WriteLine($"LastName  : {response.NameResult.ParsedName.Last}");
                    Console.WriteLine($"Suffix    : {response.NameResult.ParsedName.Suffix}");
                }
                else
                {
                    Console.WriteLine("No parsed name found.");
                }


                if (response.NameResult?.PossibleNames is not null)
                {
                    Console.WriteLine("\r\n* Possible Names *\r\n");

                    foreach (var possibleName in response.NameResult.PossibleNames)
                    {
                        Console.WriteLine($"Confidence: {possibleName.Confidence}");
                        Console.WriteLine($"Prefix    : {possibleName.ParsedName?.Prefix}");
                        Console.WriteLine($"FirstName : {possibleName.ParsedName?.First}");
                        Console.WriteLine($"MiddleName: {possibleName.ParsedName?.Middle}");
                        Console.WriteLine($"LastName  : {possibleName.ParsedName?.Last}");
                        Console.WriteLine($"Suffix    : {possibleName.ParsedName?.Suffix}");
                        Console.WriteLine();
                    }
                }
            }
            else
            {
                Console.WriteLine("\r\n* Error *\r\n");
                Console.WriteLine($"StatusDetail Message: {response.StatusDetail.Message}");
                Console.WriteLine($"StatusDetail Detail : {response.StatusDetail.Detail}");
            }
        }
    }
}