@ECHO OFF
CALL _run.bat
IF ERRORLEVEL 1 goto 1 
:1
set /p="回车重新启动..."
runWatch