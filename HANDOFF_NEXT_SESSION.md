# Handoff - Alican Korkmaz Portfolio

## Hedef
CV yerine geçecek, Android Studio/IntelliJ hissi veren kişisel portfolio sitesi.

## Mevcut Durum (Yayında Olan Sürüm)
- Tema: koyu, IDE benzeri, profesyonel tool hissi.
- Üst bar: ikonlu `Run` / `Debug` aksiyonları.
- Orta alan: sol Project Explorer + sağ Editor.
- Alt alan: terminal + status bar.
- Project Explorer: multi-module + feature-based mimari görünümü.
  - Dosya/klasör ikonları mevcut (Material Symbols tabanlı, dosya tipine göre farklı ikon/renk).
- Editor: `:app`, `:core:*`, `:feature:*`, `:benchmark`, Gradle dosya örnekleri.
  - Kotlin syntax highlighting mevcut (keyword/type/value/comment + annotation/function/number/variable/enum tokenları).
- Emulator akışı:
  - `Run`: IDE sola kayar, emulator açılır, boot animasyonu sonrası app görünür.
  - `Debug`: debug state aktif olur, mode badge `DEBUG` olur.
  - Feature screen switching aktif: `projects` / `profile` / `contact`.
  - Emulator içi alt tab + ekran içi action butonlarıyla geçiş yapılır.
  - `open projects|profile|contact` komutları emulator ekranını da senkron değiştirir.
- Layout:
  - IDE ve emulator paneli ortak geometri (`--stage-height`, `--stage-offset-y`) kullanır.
  - Run modunda IDE + emulator aynı dikey merkez noktasına kilitli (farklı monitörlerde tutarlı görünüm).
  - Geniş ekranlarda iki panel birlikte ortalanır; aradaki boşluk sabit değişkenlerle yönetilir.

## Son Yapılan Güncellemeler (2026-02-17)
- Geniş ekran run-mode yerleşiminde "off" görünen boşluk problemi giderildi.
- Emulator ve IDE'nin dikey merkezleri eşitlendi.
- Run-mode için yeni CSS değişkenleri eklendi:
  - `--run-ide-width`
  - `--run-emulator-width`
  - `--run-panel-gap`
  - `--run-layout-width`
  - `--run-edge-offset`
  - `--run-center-y`
- Mobile breakpoint (`max-width: 820px`) altında emulator gizlenirken IDE normal akışa geri alındı.
- Değişiklik pushlandı:
  - Commit: `06eb9cb`
  - Mesaj: `Align IDE and emulator vertical centers in run mode`
  - Branch: `main`
- Editor syntax highlighting genişletildi:
  - `fun` keyword vurgusu iyileştirildi.
  - `val/var` ile tanımlı değişken isimleri renklendirildi.
  - named argument isimleri (`title =`, `subtitle =` vb.) renklendirildi.
  - enum constant tokenları renklendirildi.
- Project Explorer ikonları güncellendi:
  - Önceki custom CSS ikonları yerine `Material Symbols Rounded` seti kullanılıyor.
  - Dosya tipine göre ikon mapping:
    - Kotlin: `code`
    - Gradle/KTS: `build`
    - XML: `notes`
    - TOML: `view_list`
  - Klasör ikonları bağlama göre değişiyor:
    - Module klasörleri: `folder_open`
    - `Gradle Scripts`: `settings`
    - Diğerleri: `folder`

## Canlı Yayın
- GitHub Pages URL: `https://alicankorkmaz-sudo.github.io/ak-cv/`
- Repo: `https://github.com/alicankorkmaz-sudo/ak-cv`

## Mimari Mesajı (Gösterilen)
Project explorer düzeni:
- `:app`
- `:core:ui`, `:core:domain`, `:core:network`, `:core:testing`
- `:feature:projects`, `:feature:profile`, `:feature:contact`
- `:benchmark`
- `Gradle Scripts`

Editor örnekleri:
- `settings.gradle.kts` module include listesi
- module-level `build.gradle.kts` içerikleri
- feature contract/viewmodel/screen dosyaları
- benchmark örneği

## Package Name
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
- `index.html`: IDE shell, explorer, editor, emulator mini-app markup + icon font linkleri
- `styles.css`: tema, layout, animasyonlar, responsive, panel hizalama + token/ikon stilleri
- `script.js`: dosya içerikleri, terminal komutları, run/debug state, feature switching state + syntax/icon logic
- `README.md`: kurulum ve feature özeti

## Sonraki Adım Önerileri
1. Project explorer için sürüklenebilir split-resizer eklemek.
2. Editor için satır numarası + gutter eklemek.
3. Emulator mini ekranlarını daha gerçekçi hale getirmek:
   - Projects listesine detay modal/ikinci ekran
   - Profile ekranına timeline/skill metrikleri
   - Contact ekranına gerçek link CTA
4. İçerikleri gerçek case-study metrikleriyle doldurmak.
5. Opsiyonel: custom domain + basic analytics (Plausible/GA4) eklemek.

## Yeni Oturumda Başlangıç Prompt Önerisi
"HANDOFF_NEXT_SESSION.md dosyasını okuyup mevcut prototipten devam et. İlk iş olarak <seçilen madde> implement et."
