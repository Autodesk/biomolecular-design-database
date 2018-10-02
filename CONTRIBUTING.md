# Contributing to the Biomolecular Design Database

# Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Project Roles](#project-roles)
    - [Maintainers](#maintainers)
    - [Contributors](#contributors)
- [Important Details](#important-details)
    - [Branching Model](#branching-model)
    - [Tests](#tests)
    - [Documentation](#documentation)
    - [Feature Requests and Questions](#feature-requests-and-questions)
- [What can I contribute?](#what-can-i-contribute)
    - [General Contributions](#general-contributions)
    - [Important note about pull requests](#important-note-about-pull-requests)
    - [Design and cleanup proposals](#design-and-cleanup-proposals)
- [Submitting an Issue or Pull Request](#submitting-an-issue-or-pull-request)
    - [Timing](#timing)
    - [Submitting an Issue](#submitting-an-issue)
    - [Submitting Your Pull Request](#submitting-your-pull-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- to generate: npm install doctoc: doctoc --gitlab --maxlevel 3 CONTRIBUTING.md-->


## Project Roles
### Maintainers

Maintainers are responsible for responding to pull requests and issues, as well as guiding the direction of the project. 

We currently have a single maintainer:

* Joseph Schaeffer <thiryal+bdd@gmail.com> - Project Lead, Maintainer

If you've established yourself as an impactful contributor to the project, and are willing take on the extra work, we'd love to have your help maintaining it! Email the current maintainer for details.

### Contributors

We encourage everyone to contribute to this project! You can become a contributor by forking this project and submitting pull requests. You can also contribute by reporting bugs in the Issue tracker, helping review pull requests, participate in discussions on the forums about the package, and more. 

This document exists to help guide people in what they can contribute and how they can contribute.

----

## Important Details
### Branching Model

We use the [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model. This means that all pull requests should be onto the *dev* branch. The *master* branch should always have a version tag and be the latest released version. Upcoming releases will be found in branches with the *release* prefix. 

We prefer all pull requests come from forks of the repository, rather than having maintainers and contributors create branches within the main repository. 

### Tests

We currently do not have a testing setup. If you'd like to contribute, this may be a great area to start! We could use both end-to-end tests and unit tests for individual API calls and code.

### Documentation

Existing documentation is fairly light - this is another great area for contribution!


### Feature Requests and Questions

You can file an issue on Github for any feature request or question.

-------

## What can I contribute?

If you're interested in getting started, here are some general contributions that are always welcome. 

### General Contributions

**Tests**: As mentioned above, we could really use a robust testing setup. Writing end-to-end tests or unit tests for the API would be very helpful.

**Bug fixes:** Found a typo in the code? Found that a function fails under certain conditions? Know how to fix it? Great! Go for it. Please do [open an issue](https://github.com/autodesk/biomolecular-design-database/issues) so that we know you're working on it, and submit a pull request when you're ready.

**Features:** We'd love to have new features added. Please [open an issue](https://github.com/autodesk/biomolecular-design-database/issues) so that we know what you're working on.

### Important note about pull requests

All PRs should be documented as [GitHub issues](https://github.com/autodesk/biomolecular-design-database/issues), ideally BEFORE you start working on them.

### Design and cleanup proposals

We understand this project is a work in progress, and an important part of that is improving the API, cleaning up the code, adding tests, and writing more documentation. We would love for help on these, even if you don't do any programming! 

To get started, as always: [open an issue](https://github.com/autodesk/biomolecular-design-database/issues). Let us know what you think, and we'll figure out a way to add those into the wishlist or design documents!


------

## Submitting an Issue or Pull Request

### Timing

We will attempt to respond to all issues and pull requests within two weeks. It may a bit longer before pull requests are actually merged, as they must be inspected and tested. 

### Submitting an Issue

If you've tried the Biomolecular Design Database and it isn't working like you expect, please open a new issue! We appreciate any effort you can make to avoid reporting duplicate issues, but please err on the side of reporting the bug if you're not sure.

Providing the following information will increase the chances of your issue being dealt with quickly:

* **Overview of the Issue** - Please describe the issue, and include any relevant exception messages or screenshots.
* **Environment** - Include the relevant output of your npm modules as well as your system and python version info.
* **Help us reproduce the issue** - Please include code or screenshots that will help us reproduce the issue. 
* **Related Issues** - Please link to other issues in this project (or even other projects) that appear to be related 

### Submitting Your Pull Request

Before you submit your pull request consider the following guidelines:

* Search GitHub for an open or closed Pull Request or Issue that relates to your submission. You don't want to duplicate effort.
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-pr-branch [working-branch-name]
     ```

* Create your patch.
* Commit your changes using a descriptive commit message.

     ```shell
     git add <changed files>
     git commit
     ```
  Note: we do not recommend using the `-a` command line option here, as while it will automatically "add" and "rm" edited files, it can frequently add things you do not wish to have included, such as testing files not in the `.gitignore`. Specifying the exact files you want included is preferable.
  
  We recommend (but do not require) a descriptive commit/PR message that includes the following three things:
  - Short descriptive title (~50 chars), answering what the commit/PR does.
  - Why is a change needed?  Explain why this fix was needed. This can be longer and should give the motivation for this change. Should reference issues or discussions as needed.
  - How did we implement this change? Explain how it works and why it answers the need.

  If you're interested in automating this type of message template, or for more background, read [this link](https://robots.thoughtbot.com/better-commit-messages-with-a-gitmessage-template). 

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `biomolecular-design-database:dev`
* Before any request is merged, you'll need to agree to the contribution boilerplate. This should occur automatically when you file the pull request, but you can email us at the primary maintainer contact for more detail if needed. 
