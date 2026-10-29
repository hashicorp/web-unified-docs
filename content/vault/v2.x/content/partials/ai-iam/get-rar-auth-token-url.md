
   ```bash
   # !/usr/bin/env bash
   # rar-authorize-url.sh: RAR token authorization automation script

    set -euo pipefail

    : "${APP_ID:?Set APP_ID first.}"
    : "${SECRET_VALUE:?Set SECRET_VALUE first.}"

    if [ -z "${APP_DOMAIN:-}" ]; then
        : "${APP_AUTH_URL:?Set APP_DOMAIN or APP_AUTH_URL first.}"
        APP_DOMAIN="${APP_AUTH_URL#https://}"
        APP_DOMAIN="${APP_DOMAIN%%/*}"
    fi
    APP_DOMAIN="${APP_DOMAIN#https://}"
    APP_DOMAIN="${APP_DOMAIN%%/*}"

    CODE_VERIFIER="$(openssl rand -base64 96 | tr -d '\n=+/' | cut -c1-64)"
    CODE_CHALLENGE="$(printf '%s' "${CODE_VERIFIER}" | \
        openssl dgst -binary -sha256 |                 \
        openssl base64 | tr '+/' '-_' | tr -d '=\n')"
    AUTHORIZATION_DETAILS="$(jq -cn        \
        --arg path "${RAR_PATH}"           \
        --arg action "${RAR_ACTION:-read}" \
        '[{type:"vault:path_access",path_constraint:$path,action:$action}]')"

    PAR_RESPONSE="$(curl -sS -X POST "https://${APP_DOMAIN}/oauth/par" \
        -d "client_id=${APP_ID}"                                       \
        -d "client_secret=${SECRET_VALUE}"                             \
        -d "response_type=code"                                        \
        -d "redirect_uri=http://localhost:9876/callback"               \
        -d "scope=openid profile email"                                \
        -d "audience=${AUDIENCE_ADDR}"                                 \
        -d "code_challenge=${CODE_CHALLENGE}"                          \
        -d "code_challenge_method=S256"                                \
        --data-urlencode "authorization_details=${AUTHORIZATION_DETAILS}")"

    REQUEST_URI="$(jq -er '.request_uri' <<<"${PAR_RESPONSE}" 2>/dev/null)" || {
        printf 'Auth0 PAR request failed:\n%s\n' "${PAR_RESPONSE}" >&2
        exit 1
    }

    {
        printf 'export APP_DOMAIN=%q\n' "${APP_DOMAIN}"
        printf 'export CODE_VERIFIER=%q\n' "${CODE_VERIFIER}"
        printf 'export CODE_CHALLENGE=%q\n' "${CODE_CHALLENGE}"
        printf 'export REQUEST_URI=%q\n' "${REQUEST_URI}"
    } >.rar-pkce.env
    chmod 600 .rar-pkce.env

    jq -nr \
        --arg domain "${APP_DOMAIN}" \
        --arg client_id "${APP_ID}" \
        --arg request_uri "${REQUEST_URI}" \
        '"https://\($domain)/authorize?client_id=\($client_id|@uri)&request_uri=\($request_uri|@uri)"'
   ```