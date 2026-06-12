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
//               authId
//               isLive
// 
// Optional:
//       fullName
//       prefix
//       firstName
//       middleName
//       lastName
//       suffix
//       options
//       timeoutSeconds (default: 15)

from validate_name_rest import validate_name

full_name = "John A. Smith"
prefix = ""
first_name = ""
middle_name = ""    
last_name = ""
suffix = ""
options = ""
is_live = True
auth_id = "YOUR AUTH ID"

# 2. Call the sync Invoke() method.
 response = validate_name(full_name, prefix, first_name, middle_name, last_name, suffix,
 auth_id, is_live)

# 3. Inspect results.
if response.StatusDetail and (response.StatusDetail.Message is not None or response.StatusDetail.Detail is not None):
        print("\r\n* Status Detail *\r\n")
        print(f"Message: {response.StatusDetail.Message}")
        print(f"Detail: {response.StatusDetail.Detail}")
    else:
        print("\r\n* Name Details *\r\n")
        print(f"Status: {response.Status}")
        print("\r\n*Name Result *\r\n")
        print(f"Is Valid Name: {response.NameResult.IsValidName}")
        print(f"Classification: {response.NameResult.Classification}")
        print(f"Confidence: {response.NameResult.Confidence}")
        print(f"Text In: {response.NameResult.TextIn}")
        print(f"Text Out: {response.NameResult.TextOut}")
        print(f"Parsed Name: {response.NameResult.ParsedName}")
        for idx, possible_name in enumerate(response.NameResult.PossibleNames, start=1):
            print(f"Possible Name {idx}: {possible_name}")
        print(f"Notes: {response.NameResult.Notes}")
        print(f"Warnings: {response.NameResult.Warnings}")
        print(f"First Name Found: {response.NameResult.FirstNameFound}")
        print(f"Is Common First Name: {response.NameResult.IsCommonFirstName}")
        print(f"Last Name Found: {response.NameResult.LastNameFound}")
        print(f"Is Common Last Name: {response.NameResult.IsCommonLastName}")
        print(f"Similar First Names: {response.NameResult.SimilarFirstNames}")
        print(f"Similar Last Names: {response.NameResult.SimilarLastNames}")
        print(f"Related Names: {response.NameResult.RelatedNames}")
```