param([string]$FilePath)
$c = [System.IO.File]::ReadAllText($FilePath)
$c = $c.Replace('Snapper Affiliate Partner','Affiliate Partner')
$c = $c.Replace('Selamat datang di portal kemitraan Snapp.frame Anda. Bagikan dan dapatkan penghasilan tambahan.','Selamat datang di portal affiliate Link Productive. Bagikan dan dapatkan penghasilan tambahan.')
$c = $c.Replace('Memuat Dashboard Snapper...','Memuat Dashboard Affiliate...')
$c = $c.Replace('snapp.frame','Link Productive')
$c = $c.Replace('Snapp.frame','Link Productive')
[System.IO.File]::WriteAllText($FilePath, $c)
Write-Output "Text fixed: $FilePath"
