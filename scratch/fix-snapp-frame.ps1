param([string]$FilePath)
$c = [System.IO.File]::ReadAllText($FilePath)
$c = $c.Replace('Snapp Frame','Link Productive Studio')
$c = $c.Replace('SnappFrame','LinkProductive')
[System.IO.File]::WriteAllText($FilePath, $c)
Write-Output "Fixed Snapp Frame: $FilePath"
