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

import { ValidateNameClient } from '../name-validation-3-nodejs/REST/validate_name_rest.js';

const fullName = "John Smith";
const prefix = "";
const firstName = "";
const middleName = "";
const lastName = "";
const suffix = "";
const options = "";
const timeoutSeconds = 15;
const isLive = true;
const authId = "YOUR AUTH ID";

// 2. Call the sync Invoke() method.
const response = await ValidateNameClient.invoke(
    fullName,
    prefix,
    firstName,
    middleName,
    lastName,
    suffix,
    options,
    licenseKey,
    isLive,
    timeoutSeconds
);

// 3. Inspect results.
if (response.StatusDetail) {
            console.log("\n* Status Detail *\n");
            console.log(`Status: ${response.Status}`);
            console.log(`Status Details Message: ${response.StatusDetail.Message}`);
            console.log(`Status Details Detail: ${response.StatusDetail.Detail}`);
            return;
        }

 console.log("\n* Name Details *\n");
 if (response) {
     console.log(`status              : ${response.Status}`);
     console.log(`isValidName         : ${response.NameResult?.IsValidName || null}`);
     console.log(`classification      : ${response.NameResult?.Classification || null}`);
     console.log(`confidence          : ${response.NameResult?.Confidence || null}`);
     console.log(`textIn              : ${response.NameResult?.TextIn || null}`);
     console.log(`textOut             : ${response.NameResult?.TextOut || null}`);
     console.log(`\n possibleNames:`);
     response.NameResult?.PossibleNames?.forEach((name, index) => {
     console.log(`  ${index + 1}. Confidence: ${name.Confidence}`);
     console.log(`     Prefix : ${name.ParsedName?.Prefix ?? ""}`);
     console.log(`     First : ${name.ParsedName?.First ?? ""}`);
     console.log(`     Middle: ${name.ParsedName?.Middle ?? ""}`);
     console.log(`     Last  : ${name.ParsedName?.Last ?? ""}`);
     console.log(`     Suffix : ${name.ParsedName?.Suffix ?? ""}`);
     });
     console.log(`notes               : ${response.NameResult?.Notes || null}`);
     console.log(`warnings            : ${response.NameResult?.Warnings || null}`);
     console.log(`firstNameFound      : ${response.NameResult?.FirstNameFound || null}`);
     console.log(`isCommonFirstName   : ${response.NameResult?.IsCommonFirstName || null}`);
     console.log(`lastNameFound       : ${response.NameResult?.LastNameFound || null}`);
     console.log(`isCommonLastName    : ${response.NameResult?.IsCommonLastName || null}`);
     console.log(`similarFirstNames   : ${response.NameResult?.SimilarFirstNames || null}`);
     console.log(`similarLastNames    : ${response.NameResult?.SimilarLastNames || null}`);
     console.log(`relatedNames        : ${response.NameResult?.RelatedNames || null}`);
     console.log("\n* Parsed Name *\n");
     console.log(`prefix             : ${response.NameResult?.ParsedName?.Prefix || null}`);
     console.log(`first              : ${response.NameResult?.ParsedName?.First || null}`);
     console.log(`middle             : ${response.NameResult?.ParsedName?.Middle || null}`);
     console.log(`last               : ${response.NameResult?.ParsedName?.Last || null}`);
     console.log(`suffix             : ${response.NameResult?.ParsedName?.Suffix || null}`);

     
 } else {
     console.log("No name details found.");
 }
```