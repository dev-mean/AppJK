cmd_/home/ec2-user/node/out/Release/obj/gen/debug-support.cc := LD_LIBRARY_PATH=/home/ec2-user/node/out/Release/lib.host:/home/ec2-user/node/out/Release/lib.target:$$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; cd ../deps/v8/tools/gyp; mkdir -p /home/ec2-user/node/out/Release/obj/gen; python ../../tools/gen-postmortem-metadata.py "/home/ec2-user/node/out/Release/obj/gen/debug-support.cc" ../../src/objects.h ../../src/objects-inl.h