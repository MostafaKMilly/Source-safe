if [ $1 = "dev:all:up" ]; then 
    docker-compose -f docker-compose.dev.yml up
fi
if [ $1 = "dev:all:build:up" ]; then 
    docker-compose -f docker-compose.dev.yml up --build
fi
if [ $1 = "prod:all:up" ]; then
    docker-compose -f docker-compose.prod.yml up
fi
if [ $1 = "prod:all:build:up" ]; then
    docker-compose -f docker-compose.prod.yml up --build
fi
if [ $1 = "dev:all:down" ]; then 
    docker-compose -f docker-compose.dev.yml down
fi
if [ $1 = "prod:all:down" ]; then
    docker-compose -f docker-compose.prod.yml down
fi