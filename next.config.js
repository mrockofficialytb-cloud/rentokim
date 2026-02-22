cd E:\RENT\autopujcovna

$js = @'
/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { serverActions: { allowedOrigins: ['*'] } },
};

module.exports = nextConfig;
'@

# vytvoří UTF-8 bez BOM
$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path .\next.config.js).Path, $js, $enc)

# ověření: vypíše první 12 bajtů a první řádek
Get-Content next.config.js -Encoding Byte | Select-Object -First 12
Write-Host "---- první řádek souboru ----"
Get-Content next.config.js -TotalCount 1