REM  run server and client
cd %~dp0
start scripts/runPythonServer.bat
start scripts/runNodeServer.bat
start scripts/runClient.bat
PAUSE