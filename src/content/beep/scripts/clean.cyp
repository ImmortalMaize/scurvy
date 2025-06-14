MATCH (b:Beep)
WITH b.sauce AS sauce, COLLECT(b) AS beeps
WHERE SIZE(beeps) > 1
FOREACH (n IN TAIL(beeps) | DETACH DELETE n);