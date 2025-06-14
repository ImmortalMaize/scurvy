MATCH (b: Beep)
WHERE datetime($after) < b.published <= datetime($before)
WITH b as beep 
MATCH (beep)<-[l:LIKED]-(:User)
WITH beep, count(l) as score
RETURN beep.discordId as discordId, beep.title as title, beep.sauce as sauce, score, toString(beep.published) as published