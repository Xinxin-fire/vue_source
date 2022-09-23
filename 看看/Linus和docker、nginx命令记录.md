centos和docker、nginx命令记录

#### docker

- 进入以centos镜像创造的容器， -i表示可交互，-t表示创建一个终端，  --privileged表示特权模式启动


```
docker run --privileged -i -t -p 80:80 centos:7 /bin/bash
```

- 启动容器及打开容器控制台

```
docker start 75550b99f312
docker attach 75550b99f312
```

启动配置docker

```
systemctl start docker
```

#### CentOs

- 安装git

```
yum install git
```



- vim + 文件名编辑文件：

```
按esc后 shift: + wq 保存退出
```

- 移动文件到指定目录

```
mv  文件名/*  另一个目录
mv dist.zip ./backup
```

- 新建文件夹

```
mkdir -p 文件夹名
```

#### nginx

- 查看nginx是否启动


```
ps -ef|grep nginx
```

