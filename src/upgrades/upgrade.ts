import { type CompanionStaticUpgradeScript } from '@companion-module/base'
import type { Config } from '../config.js'

import upgradeV1 from './v1.js'
import upgradeV2 from './v2.js'
import upgradeV3 from './v3.js'
import upgradeV4 from './v4.js'
import upgradeV5 from './v5.js'

export const getUpgrades: CompanionStaticUpgradeScript<Config>[] = [...upgradeV1, ...upgradeV2, ...upgradeV3, ...upgradeV4, ...upgradeV5]
