import sys
import os
from urllib import response

sys.path.insert(0, os.path.abspath("../name-validation-3-python/REST"))

from validate_name_rest import validate_name

def validate_name_rest_sdk_go(is_live: bool, auth_id: str) -> None:

    print("\r\n--------------------------------------------")
    print("Name Validation 3 - ValidateName - REST SDK")
    print("--------------------------------------------")

    full_name = "John A. Smith"
    prefix = ""
    first_name = ""
    middle_name = ""    
    last_name = ""
    suffix = ""
    options = ""

    print("\r\n* Input *\r\n")
    print(f"Full Name: {full_name}")
    print(f"Prefix: {prefix}")
    print(f"First Name: {first_name}")
    print(f"Middle Name: {middle_name}")
    print(f"Last Name: {last_name}")
    print(f"Suffix: {suffix}")
    print(f"Options: {options}")
    print(f"AuthID: {auth_id}")
    print(f"Is Live: {is_live}")

    try:
        response = validate_name(
            full_name=full_name,
            prefix=prefix,
            first_name=first_name,
            middle_name=middle_name,
            last_name=last_name,
            suffix=suffix,
            auth_id=auth_id,
            is_live=is_live
        )

        if response.StatusDetail and (
            response.StatusDetail.Message is not None or
            response.StatusDetail.Detail is not None
        ):
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
    except Exception as e:
        print("\r\n* Error *\r\n")
        print(f"Error Message: {str(e)}")
