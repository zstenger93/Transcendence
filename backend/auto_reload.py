import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os
import signal
import subprocess

class MyHandler(FileSystemEventHandler):
    def __init__(self, process):
        self.process = process

    def on_modified(self, event):
        if event.src_path.endswith('.py'):
            print(f'File changed: {event.src_path}. Restarting server.')
            self.process.kill()
            self.process = subprocess.Popen(['daphne', '-b', '0.0.0.0', '-p', '8000', 'backend.asgi:application'])

process = subprocess.Popen(['daphne', '-b', '0.0.0.0', '-p', '8000', 'backend.asgi:application'])
event_handler = MyHandler(process)
observer = Observer()
observer.schedule(event_handler, path='.', recursive=True)
observer.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
observer.join()