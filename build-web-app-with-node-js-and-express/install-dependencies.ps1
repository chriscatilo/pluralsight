npm install -g jshint # remember to run "ext install jshint" in visual studio
npm install -g gulp
Remove-Item .\node_modules -Recurse
Remove-Item .\public\lib -Recurse
npm install
bower install
docker run -it -p 27017:27017 --name mongoContainer mongo
docker rm mongoContainer