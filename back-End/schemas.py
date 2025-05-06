from pydantic import BaseModel

class QueryInput(BaseModel):
    query: str


class QueryResponse(BaseModel):
    message: str
    timestamp: str
    type: str
