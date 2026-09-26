Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "$PSScriptRoot/about_team_office.jpg").Path)

function CropHeadshot($src, $cropRect, $outFile) {
    $bmp = New-Object System.Drawing.Bitmap(400, 400)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, 400, 400)
    $g.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save("$PSScriptRoot/$outFile", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
}

# Aisha Kapoor: woman smiling near center (x: 650, y: 310, size: 140x140)
CropHeadshot $img (New-Object System.Drawing.Rectangle(650, 310, 140, 140)) "team_aisha.jpg"

# James Wong: Asian man with hoodie / blue top smiling (x: 350, y: 310, size: 140x140)
CropHeadshot $img (New-Object System.Drawing.Rectangle(350, 310, 140, 140)) "team_james.jpg"

$img.Dispose()
Write-Host "Accurate headshots cropped successfully!"
