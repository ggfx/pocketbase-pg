# pocketbase-pg

A prediction game based on pocketbase.io backend Admin UI.

## Quick Start local env

1. Start your Docker (Desktop) Environment
1. Open the terminal change into your git apps folder, and clone this repo e.g.:
    ```ps
    cd /git/
    
    git clone https://github.com/ggfx/pocketbase-pg.git
    cd pocketbase-pg
    ```
1. Run docker compose:
    ```ps
    docker compose up -d
    ```

1. A local webserver will be started on port 8080.

    Open the pocketbase Admin UI in your browser with http://localhost:8080/_/

    - Create an admin user and password first.
    - On the settings page import the collections from pb/pb_schema.json.
    
1. Go to your src/nuxtui-pg folder
    ```ps
    cd src/nuxtui-pg
    cp env.example .env
    ```
    Write your pb admin user and password into that file.
    Otherwise you won't be able to use pocketbase API with server-side-rendering.

1. Start NuxtUI frontend app.
    ```ps
    cd src/nuxtui-pg
    npm install
    npx nuxi build
    npx nuxi dev
    ```
    
    Open the NuxtUI frontend in your browser with http://localhost:3000/

    - Import/Update the teams by running http://localhost:3000/api/updateteams
    - Import/Update the competition and matches by running http://localhost:3000/api/updatematches/scheduled
    - Download flags as svg to public/assets/ folder by running http://localhost:3000/api/downloadimages

## customize docker environment

You can change exposing ports or pocketbase- and node versions.

Create/edit your root `.env` file and modify the default values.

```ps
cp env.example .env
```
