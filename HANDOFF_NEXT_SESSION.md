# Handoff - Alican Korkmaz Portfolio

## Hedef
CV yerine geçecek, Android Studio/IntelliJ hissi veren kişisel portfolio sitesi.

## Mevcut Durum (İlk Prototip Hazır)
- Tema: koyu, IDE benzeri, profesyonel tool hissi.
- Üst bar: Run/Debug butonları ikonlu.
- Orta alan: sol Project Explorer + sağ Editor.
- Alt alan: terminal + status bar.
- Run aksiyonu:
  - IDE sola yaslanır.
  - Sağda emulator görünür.
  - Boot animasyonu sonrası app preview gösterilir.
- Debug aksiyonu:
  - Debug state aktif olur.
  - Emulator mode badge `DEBUG` olur.

## Mimari Mesajı (Gösterilen)
Project explorer artık multi-module + feature-based düzeni gösteriyor:
- `:app`
- `:core:ui`, `:core:domain`, `:core:network`, `:core:testing`
- `:feature:projects`, `:feature:profile`, `:feature:contact`
- `:benchmark`
- `Gradle Scripts`

Editor örnekleri de bu yapıyı yansıtıyor:
- `settings.gradle.kts` içinde module include listesi
- module-level `build.gradle.kts` içerikleri
- feature contract/viewmodel/screen dosyaları
- benchmark örneği

## Package Name
Tüm örneklerde package kökü:
- `tech.alicankorkmaz.portfolio`

## Explorer Kontrolleri
- `Collapse All`
- `Expand All`

## Terminal Komutları
- `help`
- `ls`
- `open <alias>`
- `run`
- `debug`
- `stop`
- `clear`
- `whoami`

Önemli aliaslar:
- `open main`
- `open application`
- `open app`
- `open settings`
- `open coreui`
- `open projects`
- `open profile`
- `open contact`
- `open benchmark`

## Dosyalar
- `index.html`: UI iskeleti, explorer tree, emulator panel
- `styles.css`: tema, layout, animasyonlar, emulator oranları
- `script.js`: dosya içerikleri, explorer etkileşimi, run/debug state
- `README.md`: çalıştırma ve özellik özeti

## Sonraki Adım Önerileri
1. Project explorer için sürüklenebilir split-resizer eklemek.
2. Editor için satır numarası + gutter eklemek.
3. Emulator içinde feature bazlı gerçek mini ekran switching (projects/profile/contact).
4. Gerçek proje içeriklerini metric odaklı doldurmak.

## Yeni Oturumda Başlangıç Prompt Önerisi
"HANDOFF_NEXT_SESSION.md dosyasını okuyup mevcut prototipten devam et. İlk iş olarak <seçilen madde> implement et."
