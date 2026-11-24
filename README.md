# Till Firmware Do Us Part — A Robot's Wedding Vow

[![make.fun](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929)
[![rank](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929/h05meigames/makefun-till-firmware-do-us-part/rank.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929)
[![reward](https://make.fun/badge/u-azazex-till-firmware-do-us-part-32172929/h05meigames/makefun-till-firmware-do-us-part/reward.svg)](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929)

Entry for the [Till Firmware Do Us Part](https://make.fun/bounty/u-azazex-till-firmware-do-us-part-32172929) bounty on [make.fun](https://make.fun/r/0ene8b3q).

`main.ts` (Node 22+, stdlib only) writes one wedding vow a robot speaks at
its own wedding to `entry.txt`: one sentence, under 200 characters, funny
and heartfelt at once, in a machine's own voice. It scores a small set of
candidate vows against the judge's published criteria — the laugh first,
then tenderness, then machine voice — and writes the best one.

Run it with `MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts`; it validates the
1–200 character gate and the single-sentence rule, writes `entry.txt`, and
verifies the file on disk matches what it printed.
