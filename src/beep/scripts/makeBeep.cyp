MERGE (u: User {discord: $discordId})
CREATE (b:Beep { sauce: $sauce })<-[:MADE]-(u)
RETURN b