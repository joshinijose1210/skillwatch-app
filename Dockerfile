FROM node:20-alpine as app

RUN mkdir -p /opt/app-root/src

WORKDIR /opt/app-root/src

ENV MODE=production

ADD package.json /opt/app-root/src/package.json
ADD yarn.lock /opt/app-root/src/yarn.lock

RUN yarn install --frozen-lockfile

ADD public /opt/app-root/src/public
ADD src /opt/app-root/src/src
ADD types /opt/app-root/src/types
ADD tsconfig.json /opt/app-root/src/tsconfig.json
ADD vite.config.ts /opt/app-root/src/
ADD index.html /opt/app-root/src/

RUN --mount=type=secret,id=api_url,env=API_URL \
    --mount=type=secret,id=login_url,env=LOGIN_URL \
    --mount=type=secret,id=microsoft_id,env=MICROSOFT_ID \
    --mount=type=secret,id=react_app_client_id,env=REACT_APP_CLIENT_ID \
    --mount=type=secret,id=zoho_client_id,env=ZOHO_CLIENT_ID \
    --mount=type=secret,id=zoho_client_secret,env=ZOHO_CLIENT_SECRET \
    --mount=type=secret,id=slack_client_id,env=SLACK_CLIENT_ID \
    --mount=type=secret,id=slack_state,env=SLACK_STATE \
    --mount=type=secret,id=youtube_api_key,env=YOUTUBE_API_KEY \
    yarn run dist

FROM caddy:alpine

COPY --from=app /opt/app-root/src/dist /var/www/html
ADD Caddyfile /etc/caddy/Caddyfile

RUN chown -R 990:990 /var/www/html
USER 990

EXPOSE 8080
