![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# NV3 - Name Validation 3

Our Name Validation 3 service uses machine learning to assess and classify input names. Will validate and score, as well as analyze for negative sentiment and classify the input to distinguish between names and other types of inputs like business, dictionary, or garbage.

## [Service Objects Website](https://serviceobjects.com)

# NV3 - ValidateName 

### [ValidateName Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-name-validation-3/nv3-operations/nv3-validatename/)

## Library Usage

```
// 1. Build the input
//
//  Required fields:
//               AuthID
//               IsLive
// 
// Optional:
//       FullName
//       Prefix
//       FirstName
//       MiddleName
//       LastName
//       Suffix
//       Options
//       TimeoutSeconds (default: 15)

using name_validation_3_dot_net.REST;

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

// 2. Call the sync Invoke() method.
 var response = ValidateNameClient.Invoke(validateNameInput);

// 3. Inspect results.
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
