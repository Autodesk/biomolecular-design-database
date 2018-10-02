#!/bin/bash -e

# Create user
dropuser -U postgres -w --if-exists bddapp
createuser -U postgres -w --no-password -d -E -i -l -r -s bddapp

