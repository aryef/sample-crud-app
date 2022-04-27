##############BASE IMAGE##################################
ARG BASE_IMAGE=centos:7.8.2003

FROM $BASE_IMAGE as base

LABEL   maintainer="Arye Friedman <arye.friedman@gmail.com>" \
    name="centos7-nodejs14.19.1-npm8.6.0-yarn1.22.18"

RUN yum -y install epel-release
RUN yum -y groupinstall "Development Tools"

RUN DEBIAN_FRONTEND=noninteractive yum -y install \
    ca-certificates \
    git make cmake wget unzip libtool automake \
    devtoolset-8-gcc-c++ nano autogen libtool

RUN \
    yum -y install cmake3 \
    && alternatives --install /usr/local/bin/cmake cmake /usr/bin/cmake 10 \
    --slave /usr/local/bin/ctest ctest /usr/bin/ctest \
    --slave /usr/local/bin/cpack cpack /usr/bin/cpack \
    --slave /usr/local/bin/ccmake ccmake /usr/bin/ccmake \
    --family cmake \
    && alternatives --install /usr/local/bin/cmake cmake /usr/bin/cmake3 20 \
    --slave /usr/local/bin/ctest ctest /usr/bin/ctest3 \
    --slave /usr/local/bin/cpack cpack /usr/bin/cpack3 \
    --slave /usr/local/bin/ccmake ccmake /usr/bin/ccmake3 \
    --family cmake

WORKDIR /build

RUN \
  (curl -sL https://raw.githubusercontent.com/nodesource/distributions/master/rpm/setup_14.x | bash -)

RUN \
     yum clean all -y \
  && yum update -y \
  && yum install -y nodejs net-tools \
  && yum autoremove -y \
  && yum clean all -y


RUN npm install npm --global \
    && npm install yarn --global

##############PUSH CODE STAGE##################################
FROM base as codepush

WORKDIR /usr/src/justt

ADD ./src ./src
ADD ./logs ./logs
ADD ./scripts ./scripts

WORKDIR /usr/src/justt/src/webserver
RUN yarn install --frozen-lockfile

##############CONFIGURE CODE STAGE##################################
FROM codepush as configurer

WORKDIR /usr/src/justt/src/webserver

RUN \
	mv .env _env.dev \
    && mv _env.prod .env \
    && mv .prod_babelrc .babelrc

WORKDIR /usr/src/justt/src/webserver/server
RUN  find . -name 'package.json' -exec cp --parents \{\} ../dist/server \;

WORKDIR /usr/src/justt/src/webserver/layers
RUN  find . -name 'package.json' -exec cp --parents \{\} ../dist/layers \;

WORKDIR /usr/src/justt/src/webserver

RUN yarn build-prod

EXPOSE 50080
EXPOSE 55000
EXPOSE 22

ENV SHELL /bin/bash

#CMD '/bin/bash'

CMD ["/bin/sh", "-c", "yarn start-prod"]