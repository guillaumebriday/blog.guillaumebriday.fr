---
layout: post
title: "Why I stopped using Docker for local development"
category: Dev
description: "I've been using Docker for almost 5 years now. I wrote blog posts on it and I enjoyed using it for a long time, it solved many of my problems and simplified my life as a developer, but I'm done with it."
lang: en
---

I've been using Docker for almost 5 years now. I wrote blog posts on it and I enjoyed using it for a long time, it solved many of my problems and simplified my life as a developer, but I'm done with it.

Why? The problems that Docker solved **are not worth the amount of effort** needed to use it. I don't want to deal **with it's complexity** and workflow management.

You think Docker is easy? But running:

```bash
$ docker run wekan
```

is **not** using Docker in real life.

If you want to use Docker as your development environment, there are many things you will have **to handle by yourself**.

Let's be honest, why do we use Docker in the first place? To share the **same environment configuration** with others and **to separate your process from your host**. And that's great! These are the reasons why I've been using Docker for such a long time.

## The workflow management

![My running containers](docker.png)

### Custom configuration

If you use a terminal on a daily basis, you probably already customized it. I use [ZSH](https://ohmyz.sh/), with a custom theme/colors, custom aliases, default environment variables, plugins like auto-suggestions/syntax-highlighting and all the stuff you could find in my [dotfiles](https://github.com/guillaumebriday/dotfiles).

Sometime (often actually) you need to open a Docker container with bash. With Docker-Compose, you'd run:

```bash
$ docker-compose run app bash
```

**Wait 2 to 3 seconds** (to let Docker do his stuff) and only then, you're in a brand new container running bash in your image. Starting now, you can work.

But, you're in a basic bash environment like in 2003. No colors, no auto-suggestions, no history, no aliases and so on...

Sure I could build an image with all of this stuff in it, but I couldn't share it with my coworkers because they don't tune their environment like me. We don't use the same plugins, the same tools, the same environment variable, the same configuration... Moreover, this image **won't be ready for production**, so now I need to maintain at least two images for the same project.

I use [Git](https://git-scm.com/) as my SCM tool every day. If I don't install Git in the image with my `.gitconfig`, I would need two terminals to manage Git and my application.

Basically I can't do:

```bash
$ docker-compose run --rm --no-deps app bash
> rails stats
> git status
```

I need to exit the container first.

On my host, I just need to run:

```bash
$ rails stats
$ git status
```

### Configuration with volumes and environment variables

If you want to share the same Docker configuration or image with other people, you will probably need to allow custom configuration with environment variables and volumes.

There are many things on your hosts that you want to share with your containers.

For instance, all your dotfiles in your `$HOME`. Your `.irbrc`, `.railsrc`, `.yarnrc` are simple, but powerful tools to improve your productivity and I don't want to lose this power.

So you use volumes, or worse, you copy files in the `Dockerfile`. **You ended up with tons of environment variables and volumes**.

Same problem with cache folders. When you run `yarn install`, a copy of these dependencies are stored on your host. The next time you need them, there will be no need to download them again. Almost all package managers do the same to avoid network latency. If you don't use volumes on these folders, every single time you run an install, it will take forever. If you use a custom cache path, you will lose the ability to share your Docker configuration with others.

Example of configuration you must have in every single project:

```yml
services:
  app:
    build: .
    volumes:
      - yarn_cache:/yarn
      - node_modules_cache:/app/node_modules
      - ...
    environment:
      DISABLE_SPRING: 'true'
      YOUR_VARIABLE: '...'
      ...

volumes:
  yarn_cache:
  node_modules_cache:
  ...
```

It's a pain to find and configure all volumes and environments variables you need for every projects you're working on.

### Building time

When you use images on the Docker Hub, they are already built. You don't have to wait, you just download them.

When you're building your own images, it can take a lot of time to build them. Moreover, you need to rebuild them every time you change the `Dockerfile` and do so for every different images you need.

## Convenience

One of the best practice of Docker is to have only one process per container. For example, having Node and Ruby running in the same container is not really "the Docker way". You end up dealing with many containers and images. Every time I switch project, I need to remember to stop my running containers before starting the new ones.

As you can see, **my main issue with Docker is convenience**. You have to know so many concepts to be really effective with Docker.

- Why and how to expose ports.
- How to deal with permissions.
- How named volumes work.
- How entrypoints work.
- How networks work and Docker internal DNS works.
- And so on...

Maintaining hundred of lines of YML files **is not a thing that will make you more productive**.

Neither is prefixing all your commands with `docker-composer run app` and switching between terminals.

## Performance on macOS

Docker for Mac's performance is becoming **a running gag** at this point.

See these issues to find out more:

- [https://github.com/docker/roadmap/issues/7](https://github.com/docker/roadmap/issues/7)
- [https://github.com/docker/for-mac/issues/1592](https://github.com/docker/for-mac/issues/1592)

## The good parts

Actually, I'm still using Docker for specific use cases.

- For CI/CD.
- To use multiple versions of a service at the same time.
- To install old projects with old dependencies.
- For scalability.

Using Docker for [Nginx](https://www.nginx.com/), [Postgres](https://www.postgresql.org/), [Redis](https://redis.io/) is really helpful. I don't need to build the images, to deal with the configuration, I just need them to be up and running forever on a given port. I can also have Postgres 11 and 12 **at the same time**.

But for compiled languages and local development that's another story.

## Conclusion

I do really think Docker is an awesome tool, **but mostly for DevOps**.

For many other cases though, it feels like it creates just as many problems as it solves.
