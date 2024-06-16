# Contributing Guidelines

## Feature Requests
All feature requests should be submitted on the modules [Issue Page](https://github.com/bitfocus/companion-module-studiocoast-vmix/issues), while we try to add as many features as possible it is important to keep in mind a few things:

- Companion can run on a variety of machines, including low power devices such as Raspberry Pi's, so feature requests do have to take that into consideration as not all requests may be viable if it's leads to poor performance.

- The vMix module is limited to the capabilities provided to us by the vMix API, which means that many feature requests will be blocked externally and will require the vMix developers themselves adding functionality to allow Companion to do more.

- User Experience is an important part of module development, so there may be some features that could be considered excessive if it could bloat the module with actions/feedbacks that is only to be used by 1 or 2 people. For example this is why actions such as Custom Function exist, as this allows users to run any vMix function they like without bloating the actions list with every single niche function. If there is interest in a dedicated action/feedback for a certain function please submit a feature request and if there's support for it then it can be considered!


## Bug Reports
If you run in to an issue with the module, please give as much details as possible such as Companion version, vMix version, and messages that may be showing up in the modules log (accessible through the `>_` button next to the connection). Our aim is to resolve bugs as quickly as possible, and when an fix is rolled out it will be included in one of the beta builds that happen periodically several times each day.


## Pull Requests
While we appreciate users wishing to add to the module, it is required to first open up an issue so that you can describe what you would like to contribute, how you plan to go about it and any potential issues there may, and also see if there are any conflicts.

There are plans and timelines for the next versions, as well as code already being worked on, that you may not have access to. This means it is possible if people were to just submit code without any consideration of what's already in the works then it could turn out your pull request may be something already existing in internal forks, or that it may conflict and not work with changes that will be made, etc...

Opening an issue also gives the opportunity to discus things such as ensuring naming schemes are adhered to, the plans meet the required standards, any upgrade scripts are considered as well as potential backwards compatibility issues, and more.

We reserve the right to decline any Pull Request that does not follow these guidelines, although exceptions may be made in circumstances such as critical bug fixes.