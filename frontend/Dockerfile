FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URI
ARG VITE_TINYMCE_API_KEY

ENV VITE_API_URI=$VITE_API_URI
ENV VITE_TINYMCE_API_KEY=$VITE_TINYMCE_API_KEY

RUN npm run build

FROM nginx:1.27-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# copy /app/dist from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Keep nginx running in PID 1
CMD ["nginx", "-g", "daemon off;"]
