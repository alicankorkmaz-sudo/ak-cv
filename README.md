# Alican Korkmaz Portfolio (MVP)

Bu proje, Android IDE deneyimi hissi veren bir portfolio MVP'sidir.

## Çalıştırma

Bu klasörde aşağıdaki komutu çalıştır:

```bash
python3 -m http.server 4173
```

Ardından tarayıcıda aç:

`http://localhost:4173`

## Özellikler (v1)

- JetBrains IDE benzeri shell
- Sol tarafta multi-module project explorer (`:app`, `:core:*`, `:feature:*`, `:benchmark`)
- Explorer üstünde `Collapse All` / `Expand All` butonları
- Tek editor sekmesi (dosya tıklayınca içerik değişir)
- Alt terminal paneli (`help`, `open projects`, `run`, `debug`, `stop`, `ls`, `whoami`, `clear`)
- `Run` ile IDE sola kayar ve sağda Android emulator açılır, `Debug` ile debugger modu aktive olur
- Emulator içinde `projects/profile/contact` mini ekranları arasında alt tab ve action butonlarıyla geçiş
- `open projects`, `open profile`, `open contact` komutları emulator ekranını da senkron değiştirir
- Status bar + canlı saat

## Kişiselleştirme

- İçerikleri `script.js` içindeki `files` objesinden değiştir.
- İsim/ünvan/iletişim satırlarını gerçek bilgilerle güncelle.
- Sonraki adımda proje kartlarını `editor` içine sekmeli case study olarak ekleyebilirsin.
