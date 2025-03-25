try {
    $word = New-Object -ComObject Word.Application
    if ($word) {
        Write-Host "Office is installed successfully!"
        $word.Quit()
    }
} catch {
    Write-Host "Office COM object failed: $_" -ForegroundColor Red
    exit 1
}
