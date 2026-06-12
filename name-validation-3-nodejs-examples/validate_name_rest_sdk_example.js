import { ValidateNameClient } from '../name-validation-3-nodejs/REST/validate_name_rest.js';

async function ValidateNameClientGo(licenseKey, isLive) {
    console.log("\n--------------------------------------------");
    console.log("Name Validation 3 - ValidateName - REST SDK");
    console.log("--------------------------------------------");

    const fullName = "John Smith";
    const prefix = "";
    const firstName = "";
    const middleName = "";
    const lastName = "";
    const suffix = "";
    const options = "";
    const timeoutSeconds = 15;

    console.log("\n* Input *\n");
    console.log(`Full Name      : ${fullName}`);
    console.log(`Prefix         : ${prefix}`);
    console.log(`First Name     : ${firstName}`);
    console.log(`Middle Name    : ${middleName}`);
    console.log(`Last Name      : ${lastName}`);
    console.log(`Suffix         : ${suffix}`);
    console.log(`Options        : ${options}`);
    console.log(`License Key    : ${licenseKey}`);
    console.log(`Is Live        : ${isLive}`);
    console.log(`Timeout Seconds: ${timeoutSeconds}`);

    try {
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

       
    } catch (e) {
        console.log("\n* Error *\n");
        console.log(`Error Message: ${e.message}`);
    }
}

export { ValidateNameClientGo };