# 📊 Évaluation de Criticité Projet (IQP)

## Modèle par Axes Pondérés – Normalisation /45

---

# 1️⃣ Contexte

Dans un environnement multi-projets avec un nombre limité d’ingénieurs Qualité, il est nécessaire de :

* Prioriser les projets selon leur **niveau réel de criticité**
* Déterminer ceux nécessitant un **Ingénieur Qualité Projet dédié**
* Adapter le **niveau de gouvernance**
* Justifier les décisions en audit (ISO 9001, audits clients, management review)

L’outil IQP permet une évaluation **structurée, objective et traçable**.

---

# 2️⃣ Principe Général

L’évaluation repose sur :

* ✅ 4 axes de criticité
* ✅ 15 critères
* ✅ Coefficients standardisés : **3 / 6 / 9**
* ✅ Pondération par axe
* ✅ Normalisation finale par division **/45**

---

# 3️⃣ Structure des Axes

---

## 🔹 AXE 1 — Criticité stratégique

**Pondération : ×1,5**

Critères :

* Importance du marché
* Visibilité / impact image
* Dépendance à d’autres projets

---

## 🔹 AXE 2 — Complexité technique

**Pondération : ×1,3**

Critères :

* Complexité architecture
* Maturité technologique
* Intégration / interfaces

---

## 🔹 AXE 3 — Risque projet

**Pondération : ×1,2**

Critères :

* Risque planning
* Risque coût
* Contraintes normatives
* Durée du projet

---

## 🔹 AXE 4 — Risque organisationnel & client

**Pondération : ×1,0**

Critères :

* Taille & dispersion équipe
* Nature du projet
* Type du client
* Disponibilité client
* Coopération / stabilité décisionnelle

---

# 4️⃣ Méthode de Calcul (Version actuelle du code)

---

## 4.1 Score par axe

Chaque critère est noté :

```
3 = Faible
6 = Moyen
9 = Élevé / Critique
```

Le score d’un axe est :

```
Score Axe = Moyenne des coefficients de l’axe
```

👉 Le score axe est donc compris entre **3 et 9**

---

## 4.2 Somme pondérée

```
Somme pondérée = Σ (Score Axe × Pondération Axe)
```

---

## 4.3 Normalisation globale

```
Score Global = Somme pondérée / 45
```

Pourquoi 45 ?

Parce que :

* Maximum possible par axe = 9
* Somme des pondérations = 1.5 + 1.3 + 1.2 + 1.0 = 5
* Maximum pondéré = 9 × 5 = 45

Donc :

```
Score global ∈ [0.33 ; 1.00]
```

---

# 5️⃣ Interprétation du Score

L’outil affiche :

* Score normalisé (ex : 0,72)
* Équivalent en pourcentage (~72%)
* Gauge circulaire dynamique
* Badge niveau K3 / K2 / K1

---

## 🔎 Seuils actuels (implémentés dans le code)

| Score normalisé | Niveau         |
| --------------- | -------------- |
| < 0.56          | 🟢 Faible (K3) |
| 0.56 – 0.78     | 🟠 Moyen (K2)  |
| ≥ 0.78          | 🔴 Élevé (K1)  |

---

# 6️⃣ Mapping Gouvernance

---

## 🟢 Faible (K3)

* Pas d’ingénieur qualité dédié
* Support ponctuel si nécessaire
* Suivi intégré aux réunions projet
* Pas de jalon qualité dédié

---

## 🟠 Moyen (K2)

* Ingénieur qualité requis
* Taux d’affectation indicatif : 15–30%
* Jalons qualité formalisés
* QAP obligatoire
* Suivi risques structuré
* Reporting régulier

---

## 🔴 Élevé (K1)

* Ingénieur qualité dédié (voire équipe)
* Affectation possible 50–100%
* Gouvernance renforcée
* Audits internes projet
* Reporting comité
* Validation indépendante
* Préparation audits externes

---

# 7️⃣ Fonctionnalités de l’Outil

* 🔄 Calcul automatique temps réel
* 📊 Gauge circulaire dynamique
* 📌 Détail par axe
* ⚠ Liste automatique des critères à 9
* 📤 Export CSV complet
* 🖨 Impression / export PDF
* 📱 Responsive design
* 🏷 Logo ACTIA intégré
* 🎨 Interface moderne Tailwind CSS

---

# 8️⃣ Export CSV

Le fichier exporté contient :

* Date
* Projet
* Client
* Chef de projet
* BU
* Les 15 critères (noms explicites)
* Score axe 1 à 4
* Somme pondérée
* Score global normalisé
* Score %
* Niveau
* Classe projet
* Exigences associées

Compatible Excel (séparateur `;` + BOM UTF-8).

---

# 9️⃣ Cas d’usage recommandé

1. Chef de projet remplit l’évaluation
2. Score calculé automatiquement
3. Classification obtenue
4. Décision d’affectation Qualité validée
5. CSV archivé pour traçabilité

Recommandé :

* À l’initialisation projet
* À chaque jalon majeur
* En revue trimestrielle portefeuille

---

# 🔟 Bénéfices Organisationnels

✔ Allocation intelligente des ressources Qualité
✔ Décision basée sur le risque
✔ Harmonisation inter-projets
✔ Justification audit ISO / client
✔ Vision portefeuille projets
✔ Support management décisionnel

---

# 1️⃣1️⃣ Évolutions Futures

* Intégration SharePoint Forms
* Historique multi-projets
* Dashboard portefeuille (Power BI)
* Paramétrage dynamique des pondérations
* Version SaaS interne

---

# 1️⃣2️⃣ Auteur

**Auteur :** Dhafer Bouthelja
**Contexte :** Gouvernance Qualité Projets – ACTIA Engineering Services
**Année :** 2026

---
