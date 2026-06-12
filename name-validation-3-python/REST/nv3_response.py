"""
Response classes for Name Validation 3 (NV3) API
"""
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class StatusDetail:
    Message: Optional[str] = None
    Detail: Optional[str] = None

    def __str__(self):
        return f"StatusDetail(Message={self.Message}, Detail={self.Detail})"
    
@dataclass
class NV3Response:
    Status: Optional[str] = None
    NameResult: Optional[NameResult] = None
    StatusDetail: Optional[StatusDetail] = None

    def __str__(self):
        return (f"NV3Response(Status={self.Status}, NameResult={self.NameResult}, "
                f"StatusDetail={self.StatusDetail})")    

@dataclass
class NameResult:
    IsValidName: Optional[bool] = None
    Classification: Optional[str] = None
    Confidence: Optional[float] = None
    TextIn: Optional[str] = None
    TextOut: Optional[str] = None
    ParsedName: Optional[ParsedName] = None
    PossibleNames: Optional[List['PossibleName']] = None
    Notes: Optional[str] = None
    Warnings: Optional[str] = None
    FirstNameFound: Optional[bool] = None
    IsCommonFirstName: Optional[bool] = None
    LastNameFound: Optional[bool] = None
    IsCommonLastName: Optional[bool] = None
    SimilarFirstNames: Optional[List[str]] = None
    SimilarLastNames: Optional[List[str]] = None
    RelatedNames: Optional[List[str]] = None

    def __post_init__(self):
        if self.PossibleNames is None:
            self.PossibleNames = []
        if self.SimilarFirstNames is None:
            self.SimilarFirstNames = []
        if self.SimilarLastNames is None:
            self.SimilarLastNames = []
        if self.RelatedNames is None:
            self.RelatedNames = []

    def __str__(self):
        possible_names_str = "\n".join(str(name) for name in self.PossibleNames) if self.PossibleNames else "None"
        return (f"NameResult(Confidence={self.Confidence}, TextIn='{self.TextIn}', TextOut='{self.TextOut}', "
                f"PossibleNames=[{possible_names_str}], Notes='{self.Notes}', Warnings='{self.Warnings}', "
                f"FirstNameFound={self.FirstNameFound}, IsCommonFirstName={self.IsCommonFirstName}, "
                f"LastNameFound={self.LastNameFound}, IsCommonLastName={self.IsCommonLastName}, "
                f"SimilarFirstNames={self.SimilarFirstNames}, SimilarLastNames={self.SimilarLastNames}, "
                f"RelatedNames={self.RelatedNames})")
    
@dataclass
class ParsedName:
    Prefix: Optional[str] = None
    First: Optional[str] = None
    Middle: Optional[str] = None
    Last: Optional[str] = None
    Suffix: Optional[str] = None

    def __str__(self):
        return (f"ParsedName(Prefix='{self.Prefix}', First='{self.First}', Middle='{self.Middle}', "
                f"Last='{self.Last}', Suffix='{self.Suffix}')")
    
@dataclass
class PossibleName:
    Confidence: Optional[float] = None
    ParsedName: Optional[ParsedName] = None

    def __str__(self):
        return f"PossibleName(Confidence={self.Confidence}, ParsedName={self.ParsedName})"