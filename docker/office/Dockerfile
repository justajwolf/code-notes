# 基于 Windows Server Core
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# 安装必备组件
RUN powershell -Command \
    Add-WindowsFeature NET-Framework-45-Core

# 下载并安装 Office
ADD https://download.microsoft.com/download/6c1eeb25-cf8b-41d9-8d0d-cc1dbc032140/officedeploymenttool_18526-20146.exe /odt.exe
RUN odt.exe /extract:C:\odt /quiet /norestart
COPY config.xml C:\odt\config.xml
RUN C:\odt\setup.exe /configure C:\odt\config.xml

# 清理临时文件
RUN powershell -Command \
    Remove-Item -Path C:\odt.exe -Force ; \
    Remove-Item -Recurse -Path C:\odt -Force

# 验证 Office
COPY test_office.ps1 C:\test_office.ps1
RUN powershell -ExecutionPolicy Bypass -File C:\test_office.ps1

# 设置默认命令
CMD ["powershell"]
