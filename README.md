# pocketbase-pg

A prediction game based on pocketbase.io backend Admin UI.

## Quick Start

1. Start your Docker (Desktop) Environment
1. Open the terminal change into this app folder, e.g.:
    ```ps
    cd /git/pocketbase-pg/
    ```
1. Run docker compose
    ```ps
    docker compose up -d
    ```

This will start a local webserver on localhost:8080.

Open the Admin UI in your browser with http://localhost:8080/_/

## customize version or port

Create/edit your `.env` file and modify the default values.

```ps
cp env.local .env
```
