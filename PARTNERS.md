# Hamkor turagentliklar — qanday qo'shiladi

Ilovada joy sahifasida "Bu yerga turlar" bo'limi bor. U `assets/partners.json` faylidagi agentliklardan to'ladi.
Ro'yxat bo'sh bo'lsa, bo'lim ko'rinmaydi.

Namuna (bitta agentlik, ikkita tur):

```json
{
  "agencies": [
    {
      "id": "samarqand-tour",
      "name": "Samarqand Tour",
      "telegram": "samarqandtour",
      "whatsapp": "998901234567",
      "phone": "+998901234567",
      "license": "Turizm qo'mitasi reyestri: 12345",
      "tours": [
        { "title": "Samarqand — 2 kunlik tur", "days": 2, "price": "1 200 000 so'm", "for": ["registan", "shahizinda", "gur"] },
        { "title": "Kapadokya — havo shari bilan", "days": 5, "price": "650 $", "for": ["TR", "cappadocia"] }
      ]
    }
  ]
}
```

- `for` — tur qayerda chiqishi: joy id (`registan`), davlat ISO kodi (`TR`) yoki kategoriya (`dengiz`, `tog`, `tarix` ...).
- Aloqa tugmalari agentlikka tayyor xabar bilan ochiladi: "OLAM ilovasidan: <tur nomi> haqida bilmoqchiman".
- Agentlik nomi yonida "Hamkor" belgisi turadi.
- Faqat rasmiy ro'yxatdan o'tgan agentliklarni qo'shing va ular bilan yozma shartnoma tuzing.
