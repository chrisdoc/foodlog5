import SocketServer
import SimpleHTTPServer
import urllib

PORT = 8020

class Proxy(SimpleHTTPServer.SimpleHTTPRequestHandler):
        def do_GET(self):
                # Is this a special request to redirect?
                prefix = '/redirect?dest='
                if self.path.startswith(prefix):
                        # Strip off the pefix.
                        newPath = self.path.lstrip(prefix)
                else:
                        # Concatenate the curr dir with the relative path.
                        newPath = self.translate_path(self.path)
                self.send_header('Access-Control-Allow-Origin', '*')           
                self.end_headers()
                self.copyfile(urllib.urlopen(newPath), self.wfile)

SocketServer.ThreadingTCPServer.allow_reuse_address = True
httpd = SocketServer.ThreadingTCPServer(('', PORT), Proxy)
print "serving at port", PORT
httpd.serve_forever()