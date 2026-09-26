Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "$PSScriptRoot/about_team_office.jpg").Path)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
