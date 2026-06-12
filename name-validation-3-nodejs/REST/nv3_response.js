/**
 * Validate name response component for NV3 API
 */
export class NV3Response {
    constructor(data = {}) {
        this.Status = data.status ?? null;
        this.NameResult = data.nameResult ? new NameResult(data.nameResult) : null;
        this.StatusDetail = data.statusDetail ? new StatusDetail(data.statusDetail) : null;
    }

    get IsSuccess() {
        return this.NameResult !== null;
    }
}

/**
 * NameResult component for NV3 API response
 */
export class NameResult {
    constructor(data = {}) {
        this.IsValidName = data.isValidName ?? null;
        this.Classification = data.classification ?? null;
        this.Confidence = data.confidence ?? null;
        this.TextIn = data.textIn ?? null;
        this.TextOut = data.textOut ?? null;
        this.ParsedName = data.parsedName ? new ParsedName(data.parsedName) : null;
        this.PossibleNames = Array.isArray(data.possibleNames)
            ? data.possibleNames.map(name => new NameInfo(name))
            : [];
        this.Notes = data.notes ?? null;
        this.Warnings = data.warnings ?? null;
        this.FirstNameFound = data.firstNameFound ?? null;
        this.IsCommonFirstName = data.isCommonFirstName ?? null;
        this.LastNameFound = data.lastNameFound ?? null;
        this.IsCommonLastName = data.isCommonLastName ?? null;
        this.SimilarFirstNames = data.similarFirstNames ?? null;
        this.SimilarLastNames = data.similarLastNames ?? null;
        this.RelatedNames = data.relatedNames ?? null;
    }
}

/**
 * ParsedName component for NV3 API response
 */
export class ParsedName {
    constructor(data = {}) {
        this.Prefix = data.prefix ?? null;
        this.First = data.first ?? null;
        this.Middle = data.middle ?? null;
        this.Last = data.last ?? null;
        this.Suffix = data.suffix ?? null;
    }
}

/**
 * NameInfo component for possibleNames
 */
export class NameInfo {
    constructor(data = {}) {
        this.Confidence = data.confidence ?? null;
        this.ParsedName = data.parsedName ? new ParsedName(data.parsedName) : null;
    }
}

/**
 * StatusDetail component for NV3 API errors
 */
export class StatusDetail {
    constructor(data = {}) {
        this.Message = data.message ?? null;
        this.Detail = data.detail ?? null;
    }
}