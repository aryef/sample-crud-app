docker network create --subnet=172.19.0.0/16 justt-web-network

docker run --rm -it \
--net justt-web-network \
--ip 172.19.0.2 \
--publish 50080:50080 \
--name justt-web-container-0.1.0  \
centos7-nodejs14.19.1-npm8.6.0-yarn1.22.18:0.0.1

docker run -d \
--net justt-web-network \
--ip 172.19.0.2 \
--publish 50080:50080 \
--name justt-web-container-0.1.0  \
centos7-nodejs14.19.1-npm8.6.0-yarn1.22.18:0.0.1