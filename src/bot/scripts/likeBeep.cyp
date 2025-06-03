MATCH (user: User { discordId: $liker })
MATCH (beep: Beep { discordId: $beep })
CREATE user-[like:LIKED]->beep