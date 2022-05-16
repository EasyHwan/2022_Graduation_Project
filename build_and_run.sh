IMAGE_NAME=gaze-tracking

# root가 x server 접근할 수 있게 허락
xhost local:root
# build,run docker image
([ "$(docker images -q ${IMAGE_NAME})" == "" ] && docker build -t ${IMAGE_NAME} . ) 
([ "$(docker images -q ${IMAGE_NAME})" != "" ] && \
docker run --rm --device /dev/video0 \
	-e DISPLAY=${DISPLAY} \
	-v /tmp/.X11-unix:/tmp/.X11-unix \
	--env="QT_X11_NO_MITSHM=1" \
	-it ${IMAGE_NAME} bash)
