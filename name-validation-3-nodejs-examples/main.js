import {ValidateNameClientGo} from './validate_name_rest_sdk_example.js'

export async function main()
{

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
const licenseKey = "LICENSE KEY";
const isLive = false;

  //Phone Validation International - GetPhoneDetails - REST SDK
  ValidateNameClientGo(licenseKey, isLive);
 
}
main().catch((error) => {
  console.error('Error: ', error)
  process.exit(1)
})