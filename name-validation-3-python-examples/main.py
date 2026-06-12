from validate_name_rest_sdk_example import validate_name_rest_sdk_go


if __name__ == "__main__":
    # Your auth id from Service Objects.
    # Trial auth id will only work on the trial environments and production
    # auth id will only work on production environments.
    #
    auth_id = "LICENSE KEY"
    is_live = False

    # Name Validation 3 - ValidateName - REST SDK
    validate_name_rest_sdk_go(is_live, auth_id) 