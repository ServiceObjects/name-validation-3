using name_validation_3_dot_net_examples;

//Your AuthID from Service Objects.
//Trial AuthID will only work on the
//trail environments and production license
//keys will only work on production environments.
string AuthID = "LICENSE KEY";

bool IsProductionKey = false;

//Name Validation International - ValidateName - REST SDK
ValidateNameRestSdkExample.Go(AuthID, IsProductionKey);
