
#docker pull postgres:14.0

#use custom pg alpine image with PostGis from docker.io/aryef
docker run \
  --name justt-pg-14.0 \
  -p 45432:5432 \
  -e POSTGRES_USER=justt \
  -e POSTGRES_PASSWORD=justtmasterpwd \
  -e POSTGRES_DB=justt_web \
  -d  aryef/postgres_14.0.0_postgis_3.1.4_alpine_3.14:0.0.1


#docker exec -it  justt-alpine-pg-14.0 /bin/bash

