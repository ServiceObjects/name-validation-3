from nv3_response import NV3Response, NameResult, StatusDetail
import requests
import json

# Endpoint URLs for Service Objects Name Validation 3 (NV3) API
primary_url = "https://sws.serviceobjects.com/NV3/ValidateName?"
backup_url = "https://swsbackup.serviceobjects.com/NV3/ValidateName?"
trial_url = "https://trial.serviceobjects.com/NV3/ValidateName?"

def validate_name(
        full_name: str = "",
        prefix: str = "",
        first_name: str = "",
        middle_name: str = "",
        last_name: str = "",
        suffix: str = "",
        auth_id: str = "",
        is_live: bool = True,
        timeout_seconds: int = 15
) -> NV3Response:
    """
    Validates a name using the Service Objects Name Validation 3 (NV3) API. NV3 uses machine learning to
    to assess and classify input names. Will validate and score, as well as analyze for negative sentiment 
    and classify the input to distinguish between names and other types of inputs like business, dictionary, or garbage.
    Returns a StatusDetails response if invalid.


    Args:
        full_name (str, optional): The full name to validate. Required if no other name inputs are provided.
        prefix (str, optional): The name prefix (e.g., "Dr.", "Mr.").
        first_name (str, optional): The first name.
        middle_name (str, optional): The middle name.
        last_name (str, optional): The last name.
        suffix (str, optional): The name suffix (e.g., "Jr.", "III").
        auth_id (str): Your Service Objects authentication ID.
        is_live (bool, optional): Whether to use the live endpoint or the trial endpoint. Defaults to True (live).
        timeout_seconds (int, optional): Timeout for the API request in seconds.

    Returns:
        NV3Response: Parsed JSON response with name details or a StatusDetails if validation fails or the API call fails.

    Raises:
        RuntimeError: If the API call fails with a status of "500".
        requests.RequestException: On network/HTTP failures (trial mode).

    """

    params = {
        "FullName": full_name,
        "Prefix": prefix,
        "FirstName": first_name,
        "MiddleName": middle_name,
        "LastName": last_name,
        "Suffix": suffix,
        "AuthID": auth_id
    }

    url = primary_url if is_live else trial_url

    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()

        response_data = response.json()

        status_details = response_data.get("StatusDetail")
        if status_details:
            if is_live:
                #Try backup
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                status_details = response.json().get("StatusDetail")
                if status_details:
                    return NV3Response(StatusDetails=StatusDetail(**status_details))
            else:
                return NV3Response(StatusDetails=StatusDetail(**status_details))

        name_result = response_data.get("nameResult") or {}
        status_detail = response_data.get("statusDetail")

        return NV3Response(
            Status=response_data.get("status"),
            NameResult=NameResult(
                IsValidName=name_result.get("isValidName"),
                Classification=name_result.get("classification"),
                Confidence=name_result.get("confidence"),
                TextIn=name_result.get("textIn"),
                TextOut=name_result.get("textOut"),
                ParsedName=name_result.get("parsedName"),
                PossibleNames=name_result.get("possibleNames"),
                Notes=name_result.get("notes"),
                Warnings=name_result.get("warnings"),
                FirstNameFound=name_result.get("firstNameFound"),
                IsCommonFirstName=name_result.get("isCommonFirstName"),
                LastNameFound=name_result.get("lastNameFound"),
                IsCommonLastName=name_result.get("isCommonLastName"),
                SimilarFirstNames=name_result.get("similarFirstNames"),
                SimilarLastNames=name_result.get("similarLastNames"),
                RelatedNames=name_result.get("relatedNames"),
            ),
            StatusDetail=StatusDetail(
                Message=status_detail.get("message"),
                Detail=status_detail.get("detail"),
            ) if status_detail else None
        )
    except requests.RequestException as req_exc:
        if is_live:
            #Try backup
            try:
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                response_data = response.json()
                return NV3Response(
                    Status=response_data.get("status"),
                    NameResult=NameResult(
                        IsValidName=name_result.get("isValidName"),
                        Classification=name_result.get("classification"),
                        Confidence=name_result.get("confidence"),
                        TextIn=name_result.get("textIn"),
                        TextOut=name_result.get("textOut"),
                        ParsedName=name_result.get("parsedName"),
                        PossibleNames=name_result.get("possibleNames"),
                        Notes=name_result.get("notes"),
                        Warnings=name_result.get("warnings"),
                        FirstNameFound=name_result.get("firstNameFound"),
                        IsCommonFirstName=name_result.get("isCommonFirstName"),
                        LastNameFound=name_result.get("lastNameFound"),
                        IsCommonLastName=name_result.get("isCommonLastName"),
                        SimilarFirstNames=name_result.get("similarFirstNames"),
                        SimilarLastNames=name_result.get("similarLastNames"),
                        RelatedNames=name_result.get("relatedNames"),
                    ),
                    StatusDetail=StatusDetail(
                        Message=status_detail.get("message"),
                        Detail=status_detail.get("detail"),
                    ) if status_detail else None
                )
            except requests.RequestException as backup_exc:
                raise RuntimeError(f"API call failed for both primary and backup endpoints: {backup_exc}") from backup_exc