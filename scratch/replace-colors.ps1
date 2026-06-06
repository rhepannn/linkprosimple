# replace-colors.ps1 — Replace dark slate colors with blue/white palette

$dirs = @(
  "d:\Linkpro Simple\extracted\components\home",
  "d:\Linkpro Simple\extracted\components\layout",
  "d:\Linkpro Simple\extracted\app\(marketing)"
)

$files = foreach ($dir in $dirs) {
  Get-ChildItem $dir -Filter "*.tsx" -Recurse
}

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $original = $content
  
  # Dark text → Blue text
  $content = $content -replace 'text-slate-900', 'text-[#004aad]'
  $content = $content -replace 'text-slate-800', 'text-[#1a6fd4]'
  $content = $content -replace 'text-slate-700', 'text-sky-700'
  $content = $content -replace 'text-slate-600', 'text-sky-700'
  $content = $content -replace 'text-slate-500', 'text-sky-600'
  $content = $content -replace 'text-slate-400', 'text-sky-500'
  $content = $content -replace 'text-slate-300', 'text-sky-400'
  $content = $content -replace 'text-near-black(?!/)', 'text-[#004aad]'
  
  # Dark backgrounds → Blue/White
  $content = $content -replace 'bg-slate-950\b', 'bg-[#003494]'
  $content = $content -replace 'bg-slate-900\b', 'bg-[#004aad]'
  $content = $content -replace 'bg-slate-800\b', 'bg-[#1a6fd4]'
  $content = $content -replace 'bg-slate-50(?!/)', 'bg-[#f0f7ff]'
  $content = $content -replace 'bg-near-black\b', 'bg-[#004aad]'
  $content = $content -replace 'hover:bg-slate-800\b', 'hover:bg-[#003984]'
  $content = $content -replace 'hover:bg-slate-900\b', 'hover:bg-[#003494]'
  $content = $content -replace 'hover:bg-near-black\b', 'hover:bg-[#003984]'
  
  # Dark gradient froms/vias/tos
  $content = $content -replace 'from-slate-950\b', 'from-[#003494]'
  $content = $content -replace 'from-slate-900\b', 'from-[#004aad]'
  $content = $content -replace 'from-slate-800\b', 'from-[#1a6fd4]'
  $content = $content -replace 'via-slate-950\b', 'via-[#003494]/70'
  $content = $content -replace 'via-slate-900\b', 'via-[#004aad]/60'
  $content = $content -replace 'to-slate-950\b', 'to-[#003494]'
  $content = $content -replace 'to-slate-900\b', 'to-[#004aad]'
  $content = $content -replace 'from-near-black\b', 'from-[#004aad]'
  $content = $content -replace 'to-near-black\b', 'to-[#003984]'
  
  # Dark border colors
  $content = $content -replace 'border-slate-900\b', 'border-[#004aad]'
  $content = $content -replace 'border-near-black\b', 'border-[#004aad]'
  
  # Border opacity for near-black
  $content = $content -replace 'border-near-black/5\b', 'border-sky-100'
  $content = $content -replace 'border-near-black/10\b', 'border-sky-200'
  $content = $content -replace 'border-near-black/15\b', 'border-sky-200'
  $content = $content -replace 'border-near-black/20\b', 'border-sky-200'
  
  # Text opacity near-black
  $content = $content -replace 'text-near-black/40', 'text-sky-500'
  $content = $content -replace 'text-near-black/50', 'text-sky-500'
  $content = $content -replace 'text-near-black/60', 'text-sky-600'
  
  if ($content -ne $original) {
    Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
  } else {
    Write-Host "No change: $($file.Name)"
  }
}

Write-Host "Done."
