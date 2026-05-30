param([string]$FilePath)
$c = [System.IO.File]::ReadAllText($FilePath)
$c = $c.Replace('#1A110B','#0f172a')
[System.IO.File]::WriteAllText($FilePath, $c)
Write-Output "Fixed: $FilePath"
