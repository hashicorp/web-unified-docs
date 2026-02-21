#!/bin/bash

curl --request POST \
  --url 'https://hashicorp.atlassian.net/rest/api/3/issue' \
  --user "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data @JIRA_TEMPLATE.json