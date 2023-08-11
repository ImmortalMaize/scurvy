MATCH (s:Sauce {name: $name})
RETURN s
LIMIT 1
