# Notes

### Architecture

1. Main Process
   - create/manage browser windows (run its own web page/GUI)
   - can be only one main process
   - communicates with OS to make use of native GUI features
2. Renderer Process (visible)
   - every browser window created by main process gives rise to a renderer process
   - shows a webpage (renders the GUI)
   - using React, we only need one tab (one renderer process) by writing a SRA
3. Renderer Process (Hidden)
   - perform thread blocking task
4. Python Script
   - use `python-shell`

### Communications

1. Main <-> Renderer:
   - electron IPC
   - acts like event listeners
2. Visible Renderer <-> Hidden Renderer
   - sending messages across the main process like a relay system
3. Hidden Renderer <->ython Script
   - `python-shell` uses **stdin** and **stdout** to send a receive data from py script.
   - use JSON message format

### Boilerplate

- electron is saved as a dev dependency because `electron-builder` (packaging tool) will add electron into final build
- `wait-on` waits for a process to finish execution.
- `electron.js` is in the public folder due to production build

- visible renderer:
  - request main renderer to start a background process
  - listen for an event that the background process will send back
