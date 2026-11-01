# Votes

What the room said, one file per round (`round-1.json`, `round-1-2am.json`, `round-2.json`, …). Freya's voting app exports these during the talk and pushes them, so `git pull` gets them.

Each skill reads its round's file so the build uses the room's actual answers. Following along later? Edit a file with your own answers and re-run the round's skill.
