<p align="center">
  <img src="assets/vibebreaker-hero.svg" alt="VibeBreaker" width="100%" />
</p>

# VibeBreaker

**AI “çalışıyor” dedi. Kanıtlasın.**

VibeBreaker, AI/vibe-coded projeleri release öncesinde 20 ayrı hata sınıfından sorgulayan, agent bağımsız ve kanıt odaklı bir audit protokolüdür.

Sadece klasik güvenlik açığı aramaz. Injection ve IDOR'un yanında race condition, N+1, idempotency, transaction sınırları, memory growth, timeout/retry davranışı, API contract drift, test kör noktaları ve modüller arası sorumluluk boşluklarını da inceler.

**Vibe yok. Kanıt var.**

## 20/20 Challenge

Projenin production-ready olduğunu mu düşünüyorsun?

20 aşamanın tamamını çalıştır. 20. aşama ilk 19 aşamanın bulgularını doğrulamak yerine önce **çürütmeye** çalışır.

FULL audit sonunda:

- doğrulanmış bulgu yoksa,
- `UNVERIFIED` bulgu kalmadıysa,
- önemli bir kapsam eksikliği yoksa,

sonuç **20/20 CLEAN** olabilir.

**20/20 temiz mi? Kanıtla.**

## Agent'a verilecek komut

```text
AUDIT_PROTOCOL.md içindeki VibeBreaker 20-Pass Protocol'ün FULL audit'ini çalıştır.
01-20 aşamalarını sırayla uygula ve audit boyunca uygulama kodunu değiştirme.
Ham sonuçları .vibebreaker/raw/ altında, nihai raporu .vibebreaker/FINAL_REPORT.md içinde oluştur.
Final rapor tamamlanmadan fix uygulama.
20. aşama adversarial verifier'dır ve finding statüsünü kesinleştirebilen tek aşamadır.
```

## Verdict sistemi

| Verdict | Kural |
|---|---|
| `BROKEN` | En az 1 doğrulanmış `CRITICAL` |
| `FIX BEFORE SHIP` | Critical yok, en az 1 doğrulanmış `HIGH` |
| `SURVIVED*` | Critical/high yok ancak daha düşük seviye veya unresolved bulgular var |
| `20/20 CLEAN` | FULL audit + 0 confirmed + 0 unverified + önemli kapsam eksiği yok |

`20/20 CLEAN`, “bu uygulama tamamen güvenlidir” demek değildir. Yalnızca incelenen kapsam ve eldeki bağlam içinde hiçbir bulgunun doğrulamadan geçemediğini ifade eder.

## Neden 20. aşama önemli?

AI audit'lerinin büyük sorunu false-positive üretmesidir. VibeBreaker'da Pass 20:

- yeni bulgu ekleyemez,
- önceki finding'in kaynak konumunu tekrar bulmak zorundadır,
- mevcut guard/policy/type/constraint/framework davranışıyla bulguyu çürütmeye çalışır,
- duplicate bulguları birleştirir,
- görülmeyen koda bağlı iddiaları `UNVERIFIED` bırakır,
- `CRITICAL` seviyesini yalnızca somut ağır arıza gösterilebiliyorsa korur.

Sonuç üç bölümdür: `CONFIRMED`, `UNVERIFIED`, `REJECTED`.

## 20 aşama

1. Injection & Untrusted Input
2. Authentication & Session Management
3. Authorization & IDOR
4. Secrets & Sensitive Data Exposure
5. Error Handling & Failure Paths
6. Concurrency & Race Conditions
7. Resource Lifecycle & Leaks
8. Data Access Patterns & N+1
9. Algorithmic Complexity & Hot Paths
10. Memory & Unbounded Growth
11. External Calls, Timeouts & Resilience
12. Idempotency & Retry Safety
13. Transactions & Consistency Boundaries
14. Configuration & Environment Hardening
15. Dependencies & Supply Chain
16. Logging, Observability & Auditability
17. API Contract Consistency
18. Cross-Module Contracts & Emergent Risks
19. Test Gaps & Validation Quality
20. Verification & False-Positive Filter

## Temel kural

Audit sırasında ürün kodu **READ ONLY** kalır.

```text
AUDIT → VERIFY → FINAL REPORT → FIX PLAN → FIX → RE-AUDIT
```

Böylece agent kodu değiştirirken eski finding'in kanıtını veya bağlamını ortadan kaldırmaz.

## Sorumlu kullanım

Yalnızca sahibi olduğunuz veya denetleme yetkinizin bulunduğu yazılımlarda kullanın. VibeBreaker savunma amaçlı kod incelemesi ve release öncesi doğrulama için tasarlanmıştır.

## Lisans

MIT
