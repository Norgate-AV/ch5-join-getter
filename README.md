# ch5-join-getter

<div align="center">
    <img src="./assets/crestron-ch5-logo.png" alt="ch5-logo" width="200" />
</div>

---

[![CI](https://github.com/Norgate-AV/ch5-join-getter/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/Norgate-AV/ch5-join-getter/actions/workflows/main.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub contributors](https://img.shields.io/github/contributors/Norgate-AV/ch5-join-getter)](#contributors-sparkles)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

Dynamically get all the latest CH5 reserved join data from the CH5 json file at [https://siproducts.blob.core.windows.net/ch5-release/rjviewapp.json](https://siproducts.blob.core.windows.net/ch5-release/rjviewapp.json).

This package is intended to be used as a test helper for [crestron-ch5-helper](https://github.com/Norgate-AV/crestron-ch5-helper) to test for changes in the reserved join data.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Contents 📖

-   [Installation :zap:](#installation-zap)
-   [Usage :rocket:](#usage-rocket)
-   [Team :soccer:](#team-soccer)
-   [Contributors :sparkles:](#contributors-sparkles)
-   [LICENSE :balance_scale:](#license-balance_scale)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation :zap:

```bash
npm install --save-dev @norgate-av/ch5-join-getter

# or

yarn add -D @norgate-av/ch5-join-getter

# or

pnpm add -D @norgate-av/ch5-join-getter
```

## Usage :rocket:

The package exports a single function `getReservedJoinData` which returns a promise that resolves to the latest reserved join data.

```javascript
import { getReservedJoinData } from "@norgate-av/ch5-join-getter";

const data = await getReservedJoinData();

console.log(data.ReservedJoin.Analog.Event);
console.log(data.ReservedJoin.Digital.Event);
console.log(data.ReservedJoin.Serial.Event);

console.log(data.ReservedJoin.Analog.State);
console.log(data.ReservedJoin.Digital.State);
console.log(data.ReservedJoin.Serial.State);
```

## Team :soccer:

This project is maintained by the following person(s) and a bunch of [awesome contributors](https://github.com/Norgate-AV/ch5-join-getter/graphs/contributors).

<table>
  <tr>
    <td align="center"><a href="https://github.com/damienbutt"><img src="https://avatars.githubusercontent.com/damienbutt?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damien Butt</b></sub></a><br /></td>
  </tr>
</table>

## Contributors :sparkles:

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks go to these awesome people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification.
Contributions of any kind are welcome!

## LICENSE :balance_scale:

[MIT](LICENSE)
