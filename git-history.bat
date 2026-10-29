@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo Drag and drop one or more git project folders onto this script.
    pause
    exit /b 1
)

:next
if "%~1"=="" goto done
call :export "%~f1"
shift
goto next

:done
pause
exit /b 0

:export
set "DIR=%~1"
if "!DIR:~-1!"=="\" set "DIR=!DIR:~0,-1!"
for %%I in ("!DIR!") do (
    set "NAME=%%~nxI"
    set "PARENT=%%~dpI"
)
set "OUT=!PARENT!!NAME!-git-history.txt"

git -C "!DIR!" log --all --numstat --date=iso-strict --pretty=format:"%%n@@COMMIT@@%%nhash=%%H%%nparents=%%P%%nauthor_name=%%an%%nauthor_email=%%ae%%nauthor_date=%%aI%%ncommitter_name=%%cn%%ncommitter_email=%%ce%%ncommitter_date=%%cI%%nsubject=%%s%%nbody=%%b%%n@@FILES@@" > "!OUT!"

if errorlevel 1 (
    echo Failed: !DIR!
) else (
    echo Written: !OUT!
)
exit /b 0
