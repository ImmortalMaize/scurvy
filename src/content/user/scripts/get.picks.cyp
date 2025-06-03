MATCH p=(:User {discordId: $discordId})-[:MADE]->(beep:Beep)
MATCH (beep)<-[l:LIKED]-(:User)
WITH beep, count(l) as score
RETURN beep.discordId as discordId, score