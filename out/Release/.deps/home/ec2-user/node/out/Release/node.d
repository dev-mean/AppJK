cmd_/home/ec2-user/node/out/Release/node := flock /home/ec2-user/node/out/Release/linker.lock g++ -pthread -rdynamic -m64 -pthread  -o /home/ec2-user/node/out/Release/node -Wl,--start-group /home/ec2-user/node/out/Release/obj.target/node/src/fs_event_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/cares_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/handle_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/node.o /home/ec2-user/node/out/Release/obj.target/node/src/node_buffer.o /home/ec2-user/node/out/Release/obj.target/node/src/node_constants.o /home/ec2-user/node/out/Release/obj.target/node/src/node_extensions.o /home/ec2-user/node/out/Release/obj.target/node/src/node_file.o /home/ec2-user/node/out/Release/obj.target/node/src/node_http_parser.o /home/ec2-user/node/out/Release/obj.target/node/src/node_javascript.o /home/ec2-user/node/out/Release/obj.target/node/src/node_main.o /home/ec2-user/node/out/Release/obj.target/node/src/node_os.o /home/ec2-user/node/out/Release/obj.target/node/src/node_script.o /home/ec2-user/node/out/Release/obj.target/node/src/node_stat_watcher.o /home/ec2-user/node/out/Release/obj.target/node/src/node_string.o /home/ec2-user/node/out/Release/obj.target/node/src/node_zlib.o /home/ec2-user/node/out/Release/obj.target/node/src/pipe_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/signal_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/string_bytes.o /home/ec2-user/node/out/Release/obj.target/node/src/stream_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/slab_allocator.o /home/ec2-user/node/out/Release/obj.target/node/src/tcp_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/timer_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/tty_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/process_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/v8_typed_array.o /home/ec2-user/node/out/Release/obj.target/node/src/udp_wrap.o /home/ec2-user/node/out/Release/obj.target/node/src/node_crypto.o /home/ec2-user/node/out/Release/obj.target/deps/openssl/libopenssl.a /home/ec2-user/node/out/Release/obj.target/deps/zlib/libchrome_zlib.a /home/ec2-user/node/out/Release/obj.target/deps/http_parser/libhttp_parser.a /home/ec2-user/node/out/Release/obj.target/deps/cares/libcares.a /home/ec2-user/node/out/Release/obj.target/deps/uv/libuv.a /home/ec2-user/node/out/Release/obj.target/deps/v8/tools/gyp/libv8_base.a /home/ec2-user/node/out/Release/obj.target/deps/v8/tools/gyp/libv8_snapshot.a -Wl,--end-group -lm -ldl -lrt