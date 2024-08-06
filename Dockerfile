ARG WORKDIR


FROM docker.io/node:20.16.0-alpine3.20
ARG WORKDIR
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR ${WORKDIR}
COPY pnpm-lock.yaml ${WORKDIR}
RUN pnpm fetch
COPY . ${WORKDIR}
RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh
